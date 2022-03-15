import Fab from "@mui/material/Fab";

import PlusIcon from "@mui/icons-material/AddRounded";

function AddExpenseAction() {
  return (
    <Fab
      aria-label="add expense"
      color="primary"
      size="large"
      sx={{ bottom: 30, position: "fixed", right: 25 }}
      variant="extended"
    >
      Add expense
      <PlusIcon
        fontSize="large"
        sx={{
          borderRadius: "50%",
          color: "#fff",
          ml: 1,
          mr: -1,
        }}
      />
    </Fab>
  );
}

export default AddExpenseAction;
