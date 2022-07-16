import { FC, useState } from "react";

import { Box, Container } from "views/components/common";
import Navigation, { DrawerHeader } from "./general/Navigation";

type Props = {
  isProtected: boolean;
};

const Layout: FC<Props> = ({ children, isProtected = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((val) => !val);
  };

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
      <Navigation isOpen={isOpen} toggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
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
};

export default Layout;
