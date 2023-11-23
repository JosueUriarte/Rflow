import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { Container, List } from "@mui/material";
import { useWhiteboardContext } from "../hooks/useWhiteboardContext";
import { useNavigate } from "react-router-dom";
import { useInteractiveWhiteboardContext } from "../hooks/useInteractiveWhiteboardContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NavBar() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);
  const [openMyBoards, setOpenMyBoards] = useState(true);
  const { whiteboards, dispatch } = useWhiteboardContext();
  const { interactiveWhiteboard, dispatch: interactiveWhiteboardDispatch } =
    useInteractiveWhiteboardContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = () => {
    setOpenMyBoards(!openMyBoards);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleWhiteboardClick = (event, whiteboard) => {
    //console.log("here");

    const setInteractiveWhiteBoard = (whiteboard) => {
      console.log(
        "running interactive whiteboard: " + JSON.stringify(whiteboard)
      );
      interactiveWhiteboardDispatch({
        type: "SET_INTERACTIVE_WHITEBOARD",
        payload: whiteboard,
      });
    };

    setInteractiveWhiteBoard(whiteboard);
  };

  useEffect(() => {
    const fetchWhiteboards = async () => {
      const response = await fetch("/api/whiteboards");
      const json = await response.json();

      if (response.ok) {
        console.log("ran");
        console.log("json: " + JSON.stringify(json));
        dispatch({ type: "SET_WHITEBOARD", payload: json });
      }
    };

    fetchWhiteboards();
  }, [dispatch]);

  return (
    <div>
      <AppBar position="static" open={open}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onMouseOver={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography variant="h4" noWrap component="div">
                Creo
              </Typography>
            </Box>
            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <span>{user.email}</span>
                <button onClick={handleLogoutClick}>Log out</button>
              </Box>
            )}
            {user == null && (
              <Box sx={{ flexGrow: 0 }}>
                <button onClick={handleSignUpClick}>Sign-Up</button>
              </Box>
            )}
          </Toolbar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            onMouseLeave={handleDrawerClose}
          >
            <DrawerHeader>{"Menu"}</DrawerHeader>
            <Divider />
            {user && (
              <List>
                <ListItem>
                  <ListItemButton onClick={handleMenuClick}>
                    <ListItemText primary="My Boards" />
                    {openMyBoards ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openMyBoards} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {whiteboards != null &&
                      whiteboards.map((whiteboard) => (
                        <ListItem key={whiteboard._id}>
                          <ListItemButton
                            key={whiteboard._id}
                            onClick={(event) =>
                              handleWhiteboardClick(event, whiteboard)
                            }
                          >
                            <ListItemText primary={whiteboard.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    <Divider />
                    <ListItem>
                      <ListItemButton>
                        <ListItemText primary="Shared Boards" />
                        <ListItemIcon></ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
              </List>
            )}
            {!user && "Login to see your boards!"}
          </Drawer>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Typography variant="h4" noWrap component="div">
              Creo
            </Typography>
          </Box> */}
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
