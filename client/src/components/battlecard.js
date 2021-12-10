import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StatBar } from ".";

const createStat = (name, value) => {
  return { name, value };
};

export default function BattleCard(props) {
  const { type, stats } = props;
  useEffect(() => {
    console.log(stats);
    console.log(type);
  }, []);

  if (type == "char") {
    var {
      CHAR_ATK,
      CHAR_CUR_HP,
      CHAR_CUR_MP,
      CHAR_DEF,
      CHAR_HP,
      CHAR_LV,
      CHAR_MONEY,
      CHAR_MP,
      CHAR_NAME,
    } = stats;
  } else {
    var { MOB_ATK, MOB_CUR_HP, MOB_DEF, MOB_HP, MOB_NAME } = stats;
  }

  const statList =
    type == "char"
      ? [
          createStat("공격력", CHAR_ATK),
          createStat("방어력", CHAR_DEF),
          createStat("자금", CHAR_MONEY),
        ]
      : [createStat("공격력", MOB_ATK), createStat("방어력", MOB_DEF)];

  return (
    <TableContainer
      component={Paper}
      sx={{ width: 200, ml: type == "char" ? 3 : 0 }}
    >
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>
              {type == "char" ? CHAR_NAME : MOB_NAME}
            </TableCell>
            {type == "char" ? (
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {`Lv. ${CHAR_LV}`}
              </TableCell>
            ) : (
              <TableCell align="right" sx={{ fontWeight: "bold" }}></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <StatBar
                current={type == "char" ? CHAR_CUR_HP : MOB_CUR_HP}
                max={type == "char" ? CHAR_HP : MOB_HP}
                color="#dc143c"
                ml={8.5}
              />
            </TableCell>
          </TableRow>
          {type == "char" ? (
            <TableRow>
              <TableCell colSpan={2}>
                <StatBar
                  current={CHAR_CUR_MP}
                  max={CHAR_MP}
                  color="#1a90ff"
                  ml={8.5}
                />
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
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
