import { NavLink } from "react-router-dom";
import { styled, Theme, CSSObject } from "@mui/material/styles";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth: number = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  isOpen?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<AppBarProps>(({ theme, isOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
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
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface NavigationProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

function Navigation({ isOpen, toggleDrawer }: NavigationProps) {
  return (
    <>
      <AppBar color="primary" isOpen={isOpen} position="fixed">
        <Toolbar
          sx={
            {
              // pr: "666px", // keep right padding when drawer closed
            }
          }
        >
          <IconButton
            aria-label="open drawer menu"
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            size="large"
            sx={{
              mr: 4,
              ...(isOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" noWrap sx={{ flexGrow: 1 }} variant="h6">
            <Typography component="span" sx={{ fontWeight: 2 }} variant="h6">
              Pro
            </Typography>
            $pender{" "}
            <Typography component="span" sx={{ fontWeight: 2 }} variant="h6">
              Dashboard
            </Typography>
          </Typography>
          <IconButton aria-label="user" color="inherit" edge="start" size="large" sx={{ ml: 2 }}>
            <PersonIcon />
          </IconButton>
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
          <ListItemButton component={NavLink} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}

export default Navigation;
