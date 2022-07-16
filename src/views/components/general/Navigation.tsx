import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";

import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "../common";
import {
  CategoryIcon,
  ChevronLeftIcon,
  DashboardIcon,
  ExpenseIcon,
  MenuIcon,
  PersonIcon,
} from "../icons";

const openedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: theme.drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "0",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

type AppBarProps = MuiAppBarProps & {
  open?: boolean;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  borderLeft: "none",
  borderRight: "none",
  borderTop: "none",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    width: `calc(100% - ${theme.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type DrawerProps = MuiDrawerProps & {
  open?: boolean;
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open }) => ({
  boxSizing: "border-box",
  flexShrink: 0,
  whiteSpace: "nowrap",
  width: theme.drawerWidth,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1.5),
  /* Necessary for content to be below app bar */
  ...theme.mixins.toolbar,
}));

function getLocationName(pathname: string) {
  const path = pathname.replace("/", "");
  if (!path) return "ProSpender";

  return path[0].toUpperCase() + path.substring(1);
}

type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const Navigation: FC<Props> = ({ isOpen, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(anchorEl);

  const location = useLocation();

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
          <IconButton
            aria-label="open drawer menu"
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            size="medium"
            sx={{
              mr: 4.5,
              ...(isOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" noWrap sx={{ flexGrow: 1 }} variant="h6">
            {getLocationName(location.pathname)}
          </Typography>
          <IconButton
            aria-controls={isUserMenuOpen ? "basic-menu" : undefined}
            aria-expanded={isUserMenuOpen ? "true" : undefined}
            aria-haspopup="true"
            aria-label="user"
            color="inherit"
            size="medium"
            id="user-menu-button"
            onClick={handleUserMenuClick}
            sx={{ ml: 2 }}
          >
            <PersonIcon fontSize="medium" />
          </IconButton>
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

      <Drawer open={isOpen} variant="permanent">
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton component={NavLink} sx={{ pl: 2.5 }} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={NavLink} sx={{ pl: 2.5 }} to="/categories">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
          <ListItemButton component={NavLink} sx={{ pl: 2.5 }} to="/expenses">
            <ListItemIcon>
              <ExpenseIcon />
            </ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
