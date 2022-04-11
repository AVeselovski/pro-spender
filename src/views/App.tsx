import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import Layout from "./components/Layout";
import Notifications from "./components/general/Notifications";

const mdTheme = createTheme();

function App({ isProtected = false }) {
  console.log(mdTheme);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline enableColorScheme />
      <Notifications />

      <Layout isProtected={isProtected}>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
