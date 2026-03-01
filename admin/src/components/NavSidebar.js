import * as React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useStyles from "../styles/NavSidebar";
import logo from "../images/brand-logo.webp";

const artist = require("../images/artist.svg").default || require("../images/artist.svg");
const artistActive = require("../images/artistActive.svg").default || require("../images/artistActive.svg");
const employee = require("../images/employee.svg").default || require("../images/employee.svg");
const employeeActive = require("../images/employeeActive.svg").default || require("../images/employeeActive.svg");
const user = require("../images/user.svg").default || require("../images/user.svg");
const userActive = require("../images/userActive.svg").default || require("../images/userActive.svg");

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#fff",
  color: "#1C7EBF",
  ...(open && {
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
  "& .MuiTypography-body1": {
    fontFamily: "Montserrat !important",
  },
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100vh",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    fontFamily: "Montserrat",
    backgroundColor: "#00a99d",
    color: "#C4C4C4",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const NavSidebar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const history = useHistory();
  const handleLogout = () => {
    Cookies.remove("fanstarAdmin");
    localStorage.removeItem("fanstarAdmin");
    localStorage.removeItem("adminData");
    history.push("/");
  };

  let k = JSON.parse(localStorage.getItem("adminData"));
  // React.useEffect(() => {
  //   if(!k){
  //     history.push('/');
  //   }
  // }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/**Dashboard */}
            </Typography>
            <div className={classes.logoutBtnDiv}>
              <button className={classes.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            style={{ background: "white" }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [1],
            }}
          >
            <div className={classes.navHeader}>
              {/* <h3>Eduvisor</h3> */}
              <img
                src={logo}
                alt="logo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon className={classes.closeDrawer} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List className={classes.listDiv}>
            <ListItem
              button
              className={
                props.location.pathname.includes("/Universities")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/Universities")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/Universities") ? (
                  <img
                    src={artistActive}
                    className={classes.iconColor}
                    alt="Universities"
                  />
                ) : (
                  <img
                    src={artist}
                    className={classes.iconColor}
                    alt="Universities"
                  />
                )}
              </ListItemIcon>
              <ListItemText primary="Universities" />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes("/blogs")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/blogs")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/blogs") ? (
                  <img
                    src={employeeActive}
                    className={classes.iconColor}
                    alt="employee"
                  />
                ) : (
                  <img
                    src={employee}
                    className={classes.iconColor}
                    alt="employee"
                  />
                )}
              </ListItemIcon>
              <ListItemText primary="Blogs" />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes("/colleges")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/colleges")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/colleges") ? (
                  <img
                    src={employeeActive}
                    className={classes.iconColor}
                    alt="employee"
                  />
                ) : (
                  <img
                    src={employee}
                    className={classes.iconColor}
                    alt="employee"
                  />
                )}
              </ListItemIcon>
              <ListItemText primary="Colleges" />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes("/users")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/users")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/users") ? (
                  <img
                    src={userActive}
                    className={classes.iconColor}
                    alt="users"
                  />
                ) : (
                  <img src={user} className={classes.iconColor} alt="users" />
                )}
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes("/enquiry")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/enquiry")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/enquiry") ? (
                  <img
                    src={userActive}
                    className={classes.iconColor}
                    alt="Enquiry"
                  />
                ) : (
                  <img src={user} className={classes.iconColor} alt="users" />
                )}
              </ListItemIcon>
              <ListItemText primary="Enquiry" />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes("/testimonial")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/testimonial")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/testimonial") ? (
                  <img
                    src={userActive}
                    className={classes.iconColor}
                    alt="Testimonial"
                  />
                ) : (
                  <img src={user} className={classes.iconColor} alt="users" />
                )}
              </ListItemIcon>
              <ListItemText primary="Testimonial" />
            </ListItem>
            {/* <ListItem
              button
              className={
                props.location.pathname.includes('/payments')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/payments')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/payments') ? (
                  <img
                    src={paymentActive}
                    className={classes.iconColor}
                    alt='payments'
                  />
                ) : (
                  <img
                    src={payment}
                    className={classes.iconColor}
                    alt='payments'
                  />
                )}
              </ListItemIcon>
              <ListItemText primary='Payments ' />
            </ListItem> */}
            {/* <ListItem
              button
              className={
                props.location.pathname.includes("/gallery")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/gallery")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/gallery") ? (
                  <img
                    src={userActive}
                    className={classes.iconColor}
                    alt="Gallery"
                  />
                ) : (
                  <img src={user} className={classes.iconColor} alt="users" />
                )}
              </ListItemIcon>
              <ListItemText primary="Gallery" />
            </ListItem> */}

            <ListItem
              button
              className={
                props.location.pathname.includes("/home-showcase")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/home-showcase")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/home-showcase") ? (
                  <img
                    src={userActive}
                    className={classes.iconColor}
                    alt="home-showcase"
                  />
                ) : (
                  <img src={user} className={classes.iconColor} alt="users" />
                )}
              </ListItemIcon>
              <ListItemText primary="Home Showcase" />
            </ListItem>

            <ListItem
              button
              className={
                props.location.pathname.includes("/subpage")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/subpage")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/subpage") ? (
                  <img
                    src={userActive}
                    className={classes.iconColor}
                    alt="Subpage"
                  />
                ) : (
                  <img src={user} className={classes.iconColor} alt="users" />
                )}
              </ListItemIcon>
              <ListItemText primary="Subpage" />
            </ListItem>

            <ListItem
              button
              className={
                props.location.pathname.includes("/states")
                  ? classes.selectedList
                  : ""
              }
              onClick={() => history.push("/states")}
            >
              <ListItemIcon>
                {props.location.pathname.includes("/states") ? (
                  <img
                    src={employeeActive}
                    className={classes.iconColor}
                    alt="employee"
                  />
                ) : (
                  <img
                    src={employee}
                    className={classes.iconColor}
                    alt="employee"
                  />
                )}
              </ListItemIcon>
              <ListItemText primary="States" />
            </ListItem>
            {/* <ListItem
              button
              className={
                props.location.pathname.includes('/tables')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/tables')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/tables') ? (
                  <img
                    src={userActive}
                    className={classes.iconColor}
                    alt='tables'
                  />
                ) : (
                  <img src={user} className={classes.iconColor} alt='users' />
                )}
              </ListItemIcon>
              <ListItemText primary='Dynamic Tables' />
            </ListItem> */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              props.location.pathname.includes("/add")
                ? "#fff"
                : theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NavSidebar;
