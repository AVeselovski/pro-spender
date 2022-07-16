import { FC } from "react";

import { Fab } from "../common";
import { AddIcon } from "../icons";

type Props = {
  onAction?: () => void;
};

const AddAction: FC<Props> = ({ children = "", onAction = () => {} }) => {
  const handleAction = onAction;

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
};

export default AddAction;
