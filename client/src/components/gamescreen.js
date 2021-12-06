import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../lib/actions";
import { Button, Typography, Grid } from "@mui/material";

const Village = () => {
  const dispatch = useDispatch();
  const handleSetLocation = (loc, msg) => {
    dispatch(setLocation(loc, msg));
  };
  return (
    <Paper
      sx={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
      }}
      elevation={0}
    >
      <Button
        style={{ margin: 10 }}
        variant="contained"
        onClick={() => handleSetLocation(2, "상점으로 이동합니다.")}
      >
        <Typography variant="h6" noWrap component="div" color="white">
          상점
        </Typography>
      </Button>
    </Paper>
  );
};

const Field = () => {
  const { mobs } = useSelector((state) => state.game);
  return (
    <Paper
      sx={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
      }}
      elevation={0}
    >
      <Typography
        sx={{ textAlign: "left" }}
        variant="h6"
        noWrap
        component="div"
        color="white"
      >
        {`사냥할 몬스터를 선택하세요.`}
      </Typography>
    </Paper>
  );
};

const Shop = () => {
  return (
    <Paper
      sx={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
      }}
      elevation={0}
    >
      상점
    </Paper>
  );
};

export default function GameScreen() {
  const { inventory, location, currentLoc } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(inventory, location, currentLoc);
  }, []);

  const handleSetLocation = (loc, msg) => {
    dispatch(setLocation(loc, msg));
  };
  return (
    <Paper
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ textAlign: "left" }}
        variant="h6"
        noWrap
        component="div"
        color="white"
      >
        {`
현재 위치 : ${location[currentLoc]}
`}
      </Typography>
      {currentLoc === 0 ? <Village /> : currentLoc === 1 ? <Field /> : <Shop />}
      <Grid
        container
        spacing={1}
        sx={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item>
          <Button
            style={{ margin: 10 }}
            variant="contained"
            onClick={() => handleSetLocation(0, "마을로 이동합니다.")}
          >
            <Typography variant="h6" noWrap component="div" color="white">
              마을
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{ margin: 10 }}
            variant="contained"
            onClick={() => handleSetLocation(1, "사냥터로 이동합니다.")}
          >
            <Typography variant="h6" noWrap component="div" color="white">
              사냥터
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
