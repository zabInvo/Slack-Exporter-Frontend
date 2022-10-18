import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import { Outlet, useNavigate } from "react-router-dom";
import "../index.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
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

export default function Layout({ user, liftOpen }) {
  const handleLogout = async () => {
    window.open("https://localhost:5000/api/logout", "_self");
  };

  const [channels, setChannels] = useState(false);
  const [mappings, setMappings] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    liftOpen();
  }, [open]);

  const navigate = useNavigate();
  const toggleDrawer = () => {
    if (open) {
      setChannels(false);
      setMappings(false);
    }
    setOpen(!open);
  };

  const navigation = [
    {
      name: "dashboard",
      icon: DashboardIcon,
      to: "/dashboard",
    },
    {
      name: "Channels",
      icon: PublicIcon,
      to: "/public",
      onclick: () => setChannels(!channels),
      state: () => {
        return {
          state: channels,
          private: {
            icon: "",
            to: "/private",
          },
          public: {
            icon: "",
            to: "/public",
          },
        };
      },
    },
    {
      name: "Mapping",
      icon: PeopleAltIcon,
      to: "/publicmap",
      onclick: () => setMappings(!mappings),
      state: () => {
        return {
          state: mappings,
          private: {
            icon: "",
            to: "/privatemap",
          },
          public: {
            icon: "",
            to: "/publicmap",
          },
        };
      },
    },
  ];

  function logout() {
    navigate("/login");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div
        className="navbar cover alignment"
        style={{
          background: "rgb(64 14 64)",
          display: "flex",
          paddingRight: "24px",
          flexDirection: "row-reverse",
        }}
      >
        <img
          src={user?.userData?.data?.user?.user?.image_48}
          style={{ borderRadius: "8px", marginLeft: "12px" }}
        />
        <div style={{ textAlign: "right" }}>
          {user?.userData?.data?.user?.displayName}
          <div style={{ fontSize: "12px" }}>
            {user?.userData?.data?.user?.user?.email}
          </div>
        </div>
      </div>
      <ProSidebar style={{ height: "100vh" }} collapsed={open}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            padding: "12px",
            background: "rgb(64, 26, 64) !important",
          }}
        >
          <img
            onClick={() => (open ? toggleDrawer() : null)}
            src="https://www.pngkey.com/png/full/984-9844126_slack-new-slack-logo-png.png"
            width={"40px"}
            style={{ marginLeft: "6px" }}
            alt="N/A"
          />
          {!open ? (
            <>
              {" "}
              <div
                style={{
                  marginLeft: "12px",
                  fontWeight: "bolder",
                  fontSize: "18px",
                  width: "100%",
                  color: "white",
                }}
              >
                Slack Exporter
              </div>
              <div
                style={{ marginTop: "8px", marginLeft: "18px" }}
                onClick={toggleDrawer}
              >
                <ChevronLeftIcon />
              </div>
            </>
          ) : null}
        </div>
        <div style={{ padding: "1px", backgroundColor: "white" }}></div>
        <Menu iconShape="circle" style={{ color: "white" }}>
          <MenuItem icon={<DashboardIcon />}>
            <Link to={"/dashboard"} style={{ color: "white" }}>
              Dashboard
            </Link>
          </MenuItem>
          <SubMenu icon={<PublicIcon />} title="Channels">
            <MenuItem>
              <Link to={"/private"}>Private channels</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/public"}>Public channels</Link>
            </MenuItem>
          </SubMenu>
          <SubMenu icon={<LockPersonIcon />} title="Mapping">
            <MenuItem>
              <Link to={"/privatemap"}>Private mapping</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/publicmap"}>Public mappinng</Link>
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </ProSidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
