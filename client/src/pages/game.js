import React, { useState, useEffect } from "react";
import { Oops } from "./";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { addGameMessage, fetchCharacters } from "../lib/actions";
import { Typography } from "@mui/material";
import {
  Paper,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const theme = createTheme();

const SystemTable = () => {
  const { message } = useSelector((state) => state.game);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} size="small" aria-label="simple table">
        <TableBody>
          {message.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {`* ${row}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Game = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, isLoggedIn, characters } = useSelector((state) => state.user);
  // const { loading } = useSelector((state) => state.global);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
    } else {
      if (message[0] === "")
        dispatch(addGameMessage(message, "DB온라인을 시작합니다."));
      setInterval(() => {
        setIsMobile(window.innerWidth <= 900);
      }, 1000);
    }
  }, []);

  const { message } = useSelector((state) => state.game);
  const testMessage = () => dispatch(addGameMessage(message, Math.random()));

  return (
    <>
      {isMobile ? (
        <Oops />
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item md={8} lg={8}>
                  <Typography variant="h5">System</Typography>
                  <SystemTable />
                  <Button onClick={() => testMessage()}>테스트</Button>
                </Grid>
                <Grid item md={4} lg={4}>
                  <Typography variant="h5">인벤토리</Typography>
                  <Paper elevation={3}>ㅇ</Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default Game;
