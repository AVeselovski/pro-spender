import { FC } from "react";

import MuiPaper, { PaperProps } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(MuiPaper)<PaperProps>(({ theme }) => ({
  borderRadius: "0.5rem",
  paddingBottom: "1.5rem",
  paddingTop: "1.5rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
}));

type Props = PaperProps;

const Paper: FC<Props> = ({ children, ...props }) => {
  return (
    <StyledPaper variant="outlined" {...props}>
      {children}
    </StyledPaper>
  );
};

export default Paper;
