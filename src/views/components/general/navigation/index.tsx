import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { useAppSelector } from "app/store";
import { selectTotalBudgetSummary } from "app/categories/categories.selector";
import { formatCurrency } from "utils/numbers";

import { Chip, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from "../../common";
import { ChevronLeftIcon, MenuIcon } from "../../icons";
import AppBar, { DesktopMenuButton, MobileMenuButton, UserButton } from "./AppBar";
import Drawer, { DrawerHeader, MobileDrawer } from "./Drawer";
import NavList from "./NavList";

const getLocationName = (pathname: string) => {
  const path = pathname.replace("/", "");
  if (!path) return "ProSpender";

  return path[0].toUpperCase() + path.substring(1);
};

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const budgetSummary = useAppSelector((state) => selectTotalBudgetSummary(state));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(anchorEl);

  const location = useLocation();

  const expenses = budgetSummary.totalExpenses;
  const budget = budgetSummary.totalBudget;
  const budgetRatio = `${formatCurrency(expenses)} / ${formatCurrency(budget)}`;

  const toggleDrawer = () => {
    setIsOpen((val) => !val);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="inherit" elevation={0} open={isOpen} position="fixed" variant="outlined">
        <Toolbar>
          <DesktopMenuButton
            aria-label="open drawer menu"
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            open={isOpen}
            size="medium"
          >
            <MenuIcon />
          </DesktopMenuButton>
          <MobileMenuButton
            aria-label="open drawer menu"
            color="inherit"
            onClick={toggleDrawer}
            open={isOpen}
            size="small"
          >
            <MenuIcon />
          </MobileMenuButton>
          <Typography component="h1" noWrap sx={{ flexGrow: 1 }} variant="h6">
            {getLocationName(location.pathname)}
          </Typography>

          <Chip
            color="default"
            label={budgetRatio}
            size="small"
            sx={{ display: ["none", "block"], fontSize: "body2.fontSize", mr: 2 }}
            variant="outlined"
          />
          <UserButton
            aria-controls={isUserMenuOpen ? "basic-menu" : undefined}
            aria-expanded={isUserMenuOpen ? "true" : undefined}
            aria-haspopup="true"
            aria-label="user"
            color="inherit"
            id="user-menu-button"
            onClick={handleUserMenuClick}
          >
            John Doe
          </UserButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={isUserMenuOpen}
            onClose={handleUserMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <MobileDrawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <NavList clickCallback={toggleDrawer} />
      </MobileDrawer>

      <Drawer open={isOpen} variant="permanent">
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavList />
      </Drawer>
    </>
  );
};

export default Navigation;

export const NavSpacer = styled("div")(({ theme }) => ({
  /* Necessary for content to be below app bar */
  ...theme.mixins.toolbar,
}));
