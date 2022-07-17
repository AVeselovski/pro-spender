import { FC } from "react";

import { Box, Container } from "views/components/common";
import Navigation, { NavSpacer } from "./general/navigation";

type Props = {
  isProtected: boolean;
};

const Layout: FC<Props> = ({ children, isProtected = true }) => {
  return !isProtected ? (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
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
      <Navigation />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <NavSpacer />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
