import { FC } from "react";
import Container from "@mui/material/Container";

const MainContent: FC = ({ children }) => (
  <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", my: 4 }}>
    {children}
  </Container>
);

export default MainContent;
