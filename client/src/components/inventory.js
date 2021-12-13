import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export default function BasicTable() {
  const { inventory } = useSelector((state) => state.game);
  useEffect(() => {
    console.log(inventory);
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>아이템명</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              개수
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(inventory &&
            inventory.map((row) => {
              let { ITEM_ID, ITEM_NAME, ITEM_QTY } = row;
              console.log(ITEM_ID, ITEM_NAME, ITEM_QTY);
              return (
                <TableRow
                  key={row.ITEM_ID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.ITEM_NAME}
                  </TableCell>
                  <TableCell align="right">{row.ITEM_QTY}</TableCell>
                </TableRow>
              );
            })) ||
            ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
