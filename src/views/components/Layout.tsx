import { FC } from "react";

import { Box, Main, MainContent } from "views/components/common";
import Navigation, { NavSpacer } from "./general/navigation";

type Props = {
  isProtected: boolean;
};

const Layout: FC<Props> = ({ children, isProtected = true }) => {
  return !isProtected ? (
    <Box sx={{ display: "flex" }}>
      <Main sx={{ display: "flex" }}>
        <MainContent>{children}</MainContent>
      </Main>
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <Navigation />

      <Main>
        <NavSpacer />
        <MainContent>{children}</MainContent>
      </Main>
    </Box>
  );
};

export default Layout;
