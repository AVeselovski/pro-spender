import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/system/Box";
import Container from "@mui/material/Container";

import Navigation, { DrawerHeader } from "./components/general/Navigation";
import Notifications from "./components/general/Notifications";

const mdTheme = createTheme();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((val) => !val);
  };

  console.log(mdTheme);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline enableColorScheme />
      <Notifications />

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
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
