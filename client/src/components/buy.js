import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import api from "../lib/api";
import { POST_BATTLE_CHARACTER, addGameMessage } from "../lib/actions";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  let { currentCharacter } = useSelector((state) => state.game);
  let dispatch = useDispatch();
  let [qty, setQty] = useState(0);

  let handleBuy = () => {
    if (typeof Number(qty) != "number") {
      alert("숫자만 입력해주세요.");
      setQty(0);
    } else if (!Number.isInteger(Number(qty)) || Number(qty) <= 0) {
      alert("자연수만 가능합니다.");
    } else if (Number(qty) * row.ITEM_VALUE > currentCharacter.CHAR_MONEY) {
      alert("구매 가능한 액수를 초과했습니다.");
    } else {
      api.call
        .get("/trade", {
          params: {
            id: row.ITEM_ID,
            tradeQty: Number(qty),
            qty: 0,
            action: "buy",
            value: Number(qty) * row.ITEM_VALUE,
            char: currentCharacter.CHAR_ID,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: POST_BATTLE_CHARACTER,
            payload: res.data,
          });
          alert(`구매가 완료되었습니다.`);
          dispatch(
            addGameMessage(
              `구매로 총 ${Number(qty) * row.ITEM_VALUE}원을 사용했습니다.`
            )
          );
          setOpen(!open);
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
        <TableCell align="right">{row.ITEM_VALUE}</TableCell>
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
                onClick={() => handleBuy()}
              >
                구매
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
  let [inven, setInven] = useState([
    { ITEM_ID: 2000, ITEM_NAME: "HP 회복물약", ITEM_VALUE: 10 },
    { ITEM_ID: 2001, ITEM_NAME: "MP 회복물약", ITEM_VALUE: 20 },
  ]);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>구매</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              가격
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(inven &&
            inven.map((row) => {
              let { ITEM_ID, ITEM_NAME, ITEM_VALUE } = row;
              console.log(ITEM_ID, ITEM_NAME, ITEM_VALUE);
              return <Row key={ITEM_ID} row={row} />;
            })) ||
            ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
