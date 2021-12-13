import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocation,
  userBattleStart,
  userAttack,
  userDrinkHPPotion,
  addGameMessage,
  restAtInn,
} from "../lib/actions";
import { Button, Typography, Grid } from "@mui/material";
import { BattleCard, Sell, Buy } from ".";
import { useNavigate } from "react-router";

const Village = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const { CHAR_ID, CHAR_MONEY } = game.currentCharacter;
  const handleSetLocation = (loc, msg) => {
    dispatch(setLocation(loc, msg));
  };

  const handleInn = () => {
    dispatch(addGameMessage(`여관에 도착했습니다.`));
    if (
      window.confirm("여관에서 HP, MP를 회복하시겠습니까? 가격은 10원입니다.")
    ) {
      if (Number(CHAR_MONEY) < 10) {
        alert("돈이 부족합니다.");
      } else {
        dispatch(restAtInn(CHAR_ID));
      }
    } else {
      dispatch(addGameMessage(`다시 마을로 이동합니다.`));
    }
  };
  return (
    <Paper
      sx={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
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
      <Button
        style={{ margin: 10 }}
        variant="contained"
        onClick={() => handleInn()}
      >
        <Typography variant="h6" noWrap component="div" color="white">
          여관
        </Typography>
      </Button>
    </Paper>
  );
};

const Field = () => {
  const { mobs } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const handleBattleStart = (mob) => {
    console.log(mob);
    let currentBattleMob = {
      ...mob,
      MOB_CUR_HP: mob.MOB_HP,
    };
    dispatch(userBattleStart(currentBattleMob));
  };
  return (
    <Paper
      sx={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        margin: 5,
      }}
      elevation={0}
    >
      <Typography variant="h6" noWrap component="div">
        {`사냥할 몬스터를 선택하세요.`}
      </Typography>
      {mobs.map((mob) => {
        console.log(mob);
        const {
          MOB_ID,
          MOB_NAME,
          MOB_HP,
          MOB_ATK,
          MOB_DEF,
          MOB_EXP,
          DROP_RATE,
          ITEM_ID,
        } = mob;
        return (
          <Button
            style={{ margin: 10 }}
            variant="contained"
            onClick={() => handleBattleStart(mob)}
          >
            <Typography variant="h6" noWrap component="div" color="white">
              {MOB_NAME}
            </Typography>
          </Button>
        );
      })}
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
      }}
      elevation={0}
    >
      <Grid
        container
        spacing={2}
        sx={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item>
          <Buy />
        </Grid>
        <Grid item>
          <Sell />
        </Grid>
      </Grid>
    </Paper>
  );
};

const Battle = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { currentCharacter, currentBattleMob, inventory } = game;
  const handleAttack = () =>
    dispatch(userAttack(currentCharacter, currentBattleMob));
  const handleDrinkPotion = () => {
    dispatch(userDrinkHPPotion(currentCharacter));
  };
  return (
    <Paper
      sx={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 300,
      }}
      elevation={0}
    >
      <Grid
        container
        spacing={3}
        sx={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          mt: 0,
        }}
      >
        <BattleCard type={"char"} stats={currentCharacter} />
        <Typography
          sx={{ margin: 3 }}
          variant="h6"
          noWrap
          component="div"
          color="black"
        >
          VS
        </Typography>
        <BattleCard type={"mob"} stats={currentBattleMob} />
      </Grid>
      <Button
        sx={{ mt: 5, mb: 5 }}
        variant="contained"
        onClick={() => handleAttack()}
      >
        <Typography variant="h6" noWrap component="div" color="white">
          공격
        </Typography>
      </Button>
      <Button
        sx={{ mt: 5, ml: 5, mb: 5 }}
        variant="contained"
        onClick={() => handleDrinkPotion()}
      >
        <Typography variant="h6" noWrap component="div" color="white">
          HP포션
        </Typography>
      </Button>
    </Paper>
  );
};

export default function GameScreen() {
  const { inventory, location, currentLoc } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      {currentLoc === 0 ? (
        <Village />
      ) : currentLoc === 1 ? (
        <Field />
      ) : currentLoc === 2 ? (
        <Shop />
      ) : (
        <Battle />
      )}
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
