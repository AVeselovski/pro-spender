import { FC } from "react";
import Typography from "@mui/material/Typography";

const PageTitle: FC = ({ children }) => {
  return (
    <Typography
      color="default"
      component="h1"
      gutterBottom
      sx={{
        alignItems: "center",
        display: "flex",
        fontWeight: "fontWeightBold",
      }}
      variant="h5"
    >
      {children}
    </Typography>
  );
};

export default PageTitle;
