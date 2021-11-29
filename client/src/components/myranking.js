import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import api from "../lib/api";
import { useSelector } from "react-redux";

export default function BasicTable() {
  const [data, setData] = useState([]);
  const { name } = useSelector((state) => state.user);
  useEffect(() => {
    api.call
      .get("/myranking", { params: { name } })
      .then((res) => res.data)
      .then((data) => setData(data));
  }, []);
  return (
    <>
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
            {data.map((row) => {
              return (
                <TableRow
                  key={row.CHAR_RANK}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.CHAR_RANK}
                  </TableCell>
                  <TableCell align="right">{row.CHAR_NAME}</TableCell>
                  <TableCell align="right">{row.CHAR_LV}</TableCell>
                  <TableCell align="right">{`${row.CHAR_CUR_EXP}/${row.CHAR_EXP}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length == 0 && (
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>캐릭터가 없습니다.</Typography>
        </Box>
      )}
    </>
  );
}
