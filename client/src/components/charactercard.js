import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/system";
import { deleteCharacter, userGameStart } from "../lib/actions";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

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

const CharacterCard = (props) => {
  const {
    CHAR_NAME,
    CHAR_ID,
    CHAR_LV,
    CHAR_ATK,
    CHAR_DEF,
    CHAR_EXP,
    CHAR_CUR_EXP,
    CHAR_HP,
    CHAR_CUR_HP,
    CHAR_MP,
    CHAR_CUR_MP,
    CHAR_MONEY,
    PLAYER_ID,
  } = props.props;
  const { name } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGameStart = () =>
    dispatch(userGameStart({ ...props.props }, navigate));

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
        <Button onClick={() => handleGameStart()} size="small">
          게임 시작
        </Button>
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

export default CharacterCard;
