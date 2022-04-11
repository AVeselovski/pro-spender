import { useState } from "react";

import Box from "@mui/system/Box";
import Container from "@mui/material/Container";

import Navigation, { DrawerHeader } from "./general/Navigation";

type LayoutProps = {
  children: JSX.Element;
  isProtected: boolean;
};

function Layout({ children, isProtected = true }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((val) => !val);
  };

  return !isProtected ? (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <Navigation isOpen={isOpen} toggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <DrawerHeader />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
