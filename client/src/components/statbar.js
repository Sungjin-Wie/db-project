import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/system";

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
  const { current, max, color, ml } = props;

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
      <Box sx={{ position: "absolute", ml: ml, alignItems: "center" }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${current}/${max}`}</Typography>
      </Box>
    </Box>
  );
};

export default StatBar;
