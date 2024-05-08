import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  Link as MuiLink,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getIsUserAuth, signOutUser } from "../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AccountCircle from "@mui/icons-material/AccountCircle";

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isUserAuth = useSelector(getIsUserAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Sorry, something went wrong. Please try again later.");
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          marginBottom: 0,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => navigate("/")}
          >
            <img
              src="./images/logo.png"
              alt="SortaList Logo"
              style={{ height: "35px" }}
            />
            <span font-color="black">SortaList</span>
          </Typography>
          {!isMobile && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              {/* Create the navigation bar with links to the How it works, About us and Contact pages */}
              <Typography component="div" variant="body1" color="text.primary">
                <Box mr={5}>
                  <MuiLink component={Link} to="/instructions" color="inherit" underline="none">
                    How it works
                  </MuiLink>
                </Box>
              </Typography>
              <Typography component="div" variant="body1" color="text.primary">
                <Box mr={5}>
                  <MuiLink component={Link} to="/about-us" color="inherit" underline="none">
                    About us
                  </MuiLink>
                </Box>
              </Typography>
            </Box>
          )}
          {/* Add the Login and Sign Up button to the top right of the navigation bar */}
          {!isUserAuth ? (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flexGrow={0.3}
              pl={3}
            >
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/login")}
                    sx={{ mr: 1 }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/sign-up")}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box>
              <IconButton
                size="x-large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color={theme.palette.primary.main}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {error && <Alert severity="error">{error}</Alert>}

                <MenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <List>
            <ListItem button component={MuiLink} to="/how-it-works">
              How it works
            </ListItem>
            <ListItem button component={MuiLink} to="/about-us">
              About us
            </ListItem>
            <ListItem button component={MuiLink} to="/contact">
              Contact
            </ListItem>
          </List>
        </Drawer>
      )}
    </div>
  );
}

export default NavBar;
