import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

type Props = LinearProgressProps & {
  overflow: boolean;
};

const LinearProgressBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "overflow",
})<Props>(({ theme, overflow }) => ({
  borderRadius: 5,
  height: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: overflow ? theme.palette.error.light : theme.palette.success.light,
    borderRadius: 5,
  },
}));

export default LinearProgressBar;
