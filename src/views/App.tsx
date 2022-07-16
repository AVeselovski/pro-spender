import { Outlet } from "react-router-dom";

import { theme, ThemeProvider, CssBaseline } from "utils/theme";

import Layout from "./components/Layout";
import Notifications from "./components/general/Notifications";

const App = ({ isProtected = false }) => {
  console.log("THEME", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Notifications />

      <Layout isProtected={isProtected}>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
