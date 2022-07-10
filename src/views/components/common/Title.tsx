import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: React.ReactNode;
}

function Title(props: TitleProps) {
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
      {props.children}
    </Typography>
  );
}

export default Title;
