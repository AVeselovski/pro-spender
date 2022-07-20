import { FC } from "react";
import Container from "@mui/material/Container";

const MainContent: FC = ({ children }) => (
  <Container maxWidth={false} sx={{ display: "flex", flexDirection: "column", my: 2.5 }}>
    {children}
  </Container>
);

export default MainContent;
