import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/AddRounded";

interface Props {
  children?: React.ReactNode | string;
  handleAction?: () => void;
}

function AddAction({ children = "", handleAction = () => {} }: Props) {
  return (
    <Fab
      aria-label="add expense"
      color="primary"
      onClick={handleAction}
      size="large"
      sx={{ bottom: 30, position: "fixed", right: 25 }}
      variant="extended"
    >
      <AddIcon
        fontSize="large"
        sx={{
          borderRadius: "50%",
          color: "#fff",
          ml: -1.25,
          mr: !children ? -1.25 : 0.5,
        }}
      />
      {children}
    </Fab>
  );
}

export default AddAction;
