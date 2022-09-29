import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../index.css";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} - 14px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
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

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigation = [
    {
      name: "dashboard",
      icon: DashboardIcon,
    },
    {
      name: "public groups",
      icon: HomeWorkIcon,
    },
    {
      name: "private groups",
      icon: PeopleAltIcon,
    },
    {
      name: "setting",
      icon: SettingsIcon,
    },
  ];

  function logout() {}

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div className="navbar cover alignment">
        <div className={open ? "opened" : "closed"}>Slack Exporter</div>
      </div>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <img
              src="https://a.slack-edge.com/3026cb/img/slack_api_logo_vogue.png"
              alt="slack"
              width={160}
              style={{ margin: "auto" }}
            />
          ) : (
            ""
          )}
          <IconButton onClick={toggleDrawer}>
            {open ? (
              <ChevronLeftIcon />
            ) : (
              <img
                src="slack.png"
                alt="alt"
                width={25}
                style={{ margin: "auto" }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigation.map((text, index) => (
            <Link
              key={index}
              as={Link}
              style={{
                textDecoration: "none",
              }}
            >
              <ListItem button key={text.name}>
                <ListItemIcon>
                  <text.icon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    mt: 1,
                    color: "black",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                  primary={
                    text.name.charAt(0).toUpperCase() + text.name.slice(1)
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            sx={{
              mt: 1,
              color: "black",
              textDecoration: "none",
            }}
            primary={"Logout"}
          />
        </ListItem>
      </Drawer>

      <div style={{ width: "80%", margin: "auto" }}></div>
    </Box>
  );
}