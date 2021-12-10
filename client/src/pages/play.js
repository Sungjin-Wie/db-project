import React, { useState, useEffect } from "react";
import { Oops } from "./";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { createCharacter, fetchCharacters } from "../lib/actions";
import { CharacterCard } from "../components";

const theme = createTheme();

const Header = styled("h1")({
  marginTop: 30,
});

const Play = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newCharacterName, setNewCharacterName] = useState("");
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

  const handleSetNewCharacterName = (e) => {
    setNewCharacterName(e.target.value);
  };

  const handleCreateCharacter = () => {
    var getTextLength = function (str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
          len++;
        }
        len++;
      }
      return len;
    };
    if (getTextLength(newCharacterName) > 12) {
      alert("캐릭터 이름은 6글자 이하로 설정해주세요.");
    } else {
      dispatch(
        createCharacter({ characterName: newCharacterName, name, navigate })
      );
    }
  };
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
                <Grid item md={9} lg={9}>
                  <Header>캐릭터 선택</Header>
                </Grid>
                <Grid item md={9} lg={9}>
                  <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {characters && characters.length > 0 ? (
                      characters.map((character) => (
                        <CharacterCard props={character} />
                      ))
                    ) : (
                      <>캐릭터가 없습니다. 캐릭터를 생성하세요.</>
                    )}
                  </Box>
                </Grid>
                <Grid item md={3} lg={3}>
                  <TextField
                    fullWidth
                    id="outlined-name"
                    label="캐릭터 이름"
                    value={newCharacterName}
                    onChange={handleSetNewCharacterName}
                    sx={{ marginTop: 10 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleCreateCharacter()}
                    sx={{ marginTop: 3 }}
                  >
                    캐릭터 생성
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default Play;
