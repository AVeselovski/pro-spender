import { styled, Theme } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

const LinearProgressBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "overflow",
})(({ theme, overflow }: { theme?: Theme; overflow: boolean }) => ({
  borderRadius: 5,
  height: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme!.palette.grey[theme!.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: overflow ? theme!.palette.error.light : theme!.palette.success.light,
    borderRadius: 5,
  },
}));

export default LinearProgressBar;
