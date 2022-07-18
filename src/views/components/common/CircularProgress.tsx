import { FC } from "react";
import Box from "@mui/material/Box";
import MuiCircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type Props = CircularProgressProps;

const CircularProgress: FC<Props> = ({ value = 0, ...props }) => {
  return (
    <Box sx={{ position: "relative", mr: 2, mt: 1 }}>
      <MuiCircularProgress
        {...props}
        size={90}
        sx={{
          color: "grey.200",
        }}
        thickness={4}
        value={100}
        variant="determinate"
      />
      <MuiCircularProgress
        {...props}
        size={90}
        sx={{
          animationDuration: "550ms",
          color: value <= 100 ? "success.light" : "error.light",
          left: 0,
          position: "absolute",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        thickness={4}
        value={value}
        variant="determinate"
      />
      <Box
        sx={{
          alignItems: "center",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <Typography
          color={value <= 100 ? "success.main" : "error.main"}
          component="span"
          sx={{ mb: "0.25rem" }}
          variant="h5"
        >
          {`${value.toFixed(0)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgress;
