import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../lib/api";

export default function BasicTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .call("/ranking")
      .then((res) => res.data)
      .then((data) => setData(data));
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>랭킹</TableCell>
            <TableCell align="right">이름</TableCell>
            <TableCell align="right">레벨</TableCell>
            <TableCell align="right">경험치</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow
                key={row.CHAR_RANK}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.CHAR_RANK}
                </TableCell>
                <TableCell align="right">{row.CHAR_NAME}</TableCell>
                <TableCell align="right">{row.CHAR_LV}</TableCell>
                <TableCell align="right">{row.CHAR_EXP}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
