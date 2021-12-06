import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { StatBar } from ".";

const createStat = (name, value) => {
  return { name, value };
};

export default function Stats() {
  const { stats } = useSelector((state) => state.game);
  useEffect(() => {
    console.log(stats);
  }, []);
  const {
    CHAR_ATK,
    CHAR_CUR_EXP,
    CHAR_CUR_HP,
    CHAR_CUR_MP,
    CHAR_DEF,
    CHAR_EXP,
    CHAR_HP,
    CHAR_ID,
    CHAR_LV,
    CHAR_MONEY,
    CHAR_MP,
    CHAR_NAME,
    PLAYER_ID,
  } = stats;
  const statList = [
    createStat("공격력", CHAR_ATK),
    createStat("방어력", CHAR_DEF),
    createStat("자금", CHAR_MONEY),
  ];

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>{CHAR_NAME}</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              {`Lv. ${CHAR_LV}`}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <StatBar
                current={CHAR_CUR_HP}
                max={CHAR_HP}
                color="#dc143c"
                ml={13.5}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              <StatBar
                current={CHAR_CUR_MP}
                max={CHAR_MP}
                color="#1a90ff"
                ml={13.5}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              <StatBar
                current={CHAR_CUR_EXP}
                max={CHAR_EXP}
                color="#ffd400"
                ml={13.5}
              />
            </TableCell>
          </TableRow>

          {statList &&
            statList.map((row) => {
              console.log(`row: ${row.name} + ${row.value}`);
              return (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
