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
// import { Loading } from "../components";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import {
  createCharacter,
  deleteCharacter,
  fetchCharacters,
} from "../lib/actions";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

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
                        <BasicCard props={character} />
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

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  margin: 5,
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#dddddd",
  },
}));

const StatBar = (props) => {
  const { current, max, color } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <ProgressBar
          variant="determinate"
          value={(current / max) * 100}
          sx={{
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              backgroundColor: color,
            },
          }}
        />
      </Box>
      <Box sx={{ position: "absolute", ml: 6, alignItems: "center" }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${current}/${max}`}</Typography>
      </Box>
    </Box>
  );
};

const BasicCard = (props) => {
  const {
    CHAR_NAME,
    CHAR_ID,
    CHAR_LV,
    // CHAR_ATK,
    // CHAR_DEF,
    CHAR_EXP,
    CHAR_CUR_EXP,
    CHAR_HP,
    CHAR_CUR_HP,
    CHAR_MP,
    CHAR_CUR_MP,
    // CHAR_MONEY,
    // PLAYER_ID,
  } = props.props;
  const { name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteCharacter = (CHAR_ID, name) => {
    if (
      window.confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다!") ===
      true
    ) {
      dispatch(deleteCharacter(CHAR_ID, name));
    } else return;
  };
  return (
    <Card sx={{ width: 180, margin: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {CHAR_NAME}
        </Typography>
        <Typography
          sx={{ fontSize: 14, mt: 2 }}
          color="text.secondary"
          gutterBottom
        >
          {`Lv. ${CHAR_LV}`}
        </Typography>
        <StatBar current={CHAR_CUR_HP} max={CHAR_HP} color="#dc143c" />
        <StatBar current={CHAR_CUR_MP} max={CHAR_MP} color="#1a90ff" />
        <StatBar current={CHAR_CUR_EXP} max={CHAR_EXP} color="#ffd400" />
      </CardContent>
      <CardActions>
        <Button size="small">게임 시작</Button>
        <Button
          onClick={() => handleDeleteCharacter(CHAR_ID, name)}
          size="small"
          color="error"
        >
          캐릭터 삭제
        </Button>
      </CardActions>
    </Card>
  );
};

export default Play;
