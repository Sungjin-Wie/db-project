import React, { useState, useEffect } from "react";
import { Oops } from "./";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { fetchCharacters } from "../lib/actions";
import { Typography } from "@mui/material";

const theme = createTheme();

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
      dispatch(fetchCharacters(name));
      setInterval(() => {
        setIsMobile(window.innerWidth <= 900);
      }, 1000);
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <Oops />
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Typography>this is game.</Typography>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default Game;
