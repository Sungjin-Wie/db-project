import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import api from "../lib/api";
import { POST_BATTLE_CHARACTER, addGameMessage } from "../lib/actions";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  let [qty, setQty] = useState(Number(row.ITEM_QTY));
  let { currentCharacter } = useSelector((state) => state.game);
  let dispatch = useDispatch();

  let handleSell = (ITEM_QTY) => {
    if (typeof Number(qty) != "number") {
      alert("숫자만 입력해주세요.");
      setQty(0);
    } else if (
      !Number.isInteger(Number(qty)) ||
      Number(qty) <= 0 ||
      Number(qty) > ITEM_QTY
    ) {
      alert("범위 내의 정수만 입력해주세요.");
      setQty(0);
    } else {
      api.call.get("/item", { params: { id: row.ITEM_ID } }).then((res) => {
        let value = res.data[0].ITEM_VALUE * Number(qty);
        api.call
          .get("/trade", {
            params: {
              id: row.ITEM_ID,
              tradeQty: Number(qty),
              action: "sell",
              char: currentCharacter.CHAR_ID,
            },
          })
          .then((res) => {
            dispatch({
              type: POST_BATTLE_CHARACTER,
              payload: res.data,
            });
          });
        alert(`판매가 완료되었습니다.`);
        dispatch(addGameMessage(`판매로 총 ${value}원을 얻었습니다.`));
        setOpen(!open);
        setQty(0);
      });
    }
  };

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {row.ITEM_NAME}
        </TableCell>
        <TableCell align="right">{row.ITEM_QTY}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, display: "flex" }}>
              <TextField
                id="outlined-name"
                label="개수"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                size="small"
                sx={{ maxWidth: 55 }}
              />
              <Button
                align="right"
                sx={{ fontWeight: "bold" }}
                onClick={() => handleSell(row.ITEM_QTY)}
              >
                판매
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function BasicTable() {
  const { inventory } = useSelector((state) => state.game);
  let [inven, setInven] = useState([]);
  useEffect(() => {
    setInven(inventory);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>판매</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              개수
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(inventory &&
            inventory.map((row) => {
              let { ITEM_ID, ITEM_NAME, ITEM_QTY } = row;
              return <Row key={ITEM_ID} row={row} />;
            })) ||
            ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
