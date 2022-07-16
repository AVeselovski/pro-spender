import { FC } from "react";

import Box from "@mui/material/Box";
import MuiDialog, { dialogClasses, DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";

import Transition from "./Transition";
import { CloseRounded } from "../icons";

const StyledDialog = styled(MuiDialog)<DialogProps>(({ theme }) => ({
  [`.${dialogClasses.paper}`]: {
    borderRadius: "0.75rem",
    marginBottom: "0",
    marginTop: "4rem",
    maxHeight: "calc(100%)",
    marginLeft: "0",
    marginRight: "0",
  },
}));

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const Modal: FC<Props> = ({ children, isOpen = false, onClose = () => {}, title = "" }) => {
  const ariaLabel = title.replace(" ", "-").toLowerCase();
  const handleClose = onClose;

  return (
    <StyledDialog
      aria-labelledby={`${ariaLabel}-modal-title`}
      aria-describedby={`${ariaLabel}-modal-description`}
      closeAfterTransition
      keepMounted
      onClose={handleClose}
      open={isOpen}
      sx={{ marginTop: "4rem" }}
      TransitionComponent={Transition}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          pr: 2,
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <IconButton onClick={handleClose}>
          <CloseRounded />
        </IconButton>
      </Box>
      {children}
    </StyledDialog>
  );
};

export default Modal;
