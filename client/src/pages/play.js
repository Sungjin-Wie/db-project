import React, { useState, useEffect } from "react";
import { Oops } from "./";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Loading } from "../components";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createCharacter, fetchCharacters } from "../lib/actions";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const theme = createTheme();

const Play = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newCharacterName, setNewCharacterName] = useState("");
  const { name, isLoggedIn, characters } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.global);
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
    dispatch(
      createCharacter({ characterName: newCharacterName, name, navigate })
    );
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
                  <Typography component="h1" variant="h5">
                    캐릭터 선택
                  </Typography>
                </Grid>
                <Grid item md={9} lg={9}>
                  <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {characters && characters.length > 0 ? (
                      characters.map((character) => {
                        return <BasicCard props={character} />;
                      })
                    ) : (
                      <></>
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

const BasicCard = (props) => {
  const {
    CHAR_ATK,
    CHAR_DEF,
    CHAR_EXP,
    CHAR_HP,
    CHAR_ID,
    CHAR_LV,
    CHAR_MONEY,
    CHAR_MP,
    CHAR_NAME,
    PLAYER_ID,
  } = props.props;
  console.log(CHAR_LV, CHAR_NAME);
  return (
    <Grid item md={3} lg={3}>
      <Card sx={{ width: 200, margin: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`Lv. ${CHAR_LV}`}
          </Typography>
          <Typography variant="h5" component="div">
            {CHAR_NAME}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {/* adjective */}
          </Typography>
          <Typography variant="body2">
            {/* well meaning and kindly. */}
            <br />
            {/* {'"a benevolent smile"'} */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">게임 시작</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Play;
