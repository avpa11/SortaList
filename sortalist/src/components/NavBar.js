import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Link as MuiLink,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Grid,
} from "@mui/material";
import { getIsUserAuth, signOutUser } from "../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { motion, useCycle } from "framer-motion";
import { Navigation } from "./animation/Navigation";
import { MenuToggle } from "./animation/MenuToggle";
import { useDimensions } from "../utils/useDimensions";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
    backgroundColor: "rgba(255,255,255, 0.9)",
  }),
  closed: {
    clipPath: "circle(25px at 40px 29px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
    backgroundColor: "rgb(87, 93, 251)",
  },
};

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isUserAuth = useSelector(getIsUserAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

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
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              zIndex: 2,
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
                  <MuiLink
                    component={Link}
                    to="/instructions"
                    color="inherit"
                    underline="none"
                  >
                    How it works
                  </MuiLink>
                </Box>
              </Typography>
              <Typography component="div" variant="body1" color="text.primary">
                <Box mr={5}>
                  <MuiLink
                    component={Link}
                    to="/about-us"
                    color="inherit"
                    underline="none"
                  >
                    About us
                  </MuiLink>
                </Box>
              </Typography>
            </Box>
          )}
          {/* Add the Login and Sign Up button to the top right of the navigation bar */}
          {!isMobile &&
            (!isUserAuth ? (
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
            ))}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
        >
          <motion.div className="background" variants={sidebar} />
          <Navigation isUserAuth={isUserAuth} />
          <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
      )}
    </div>
  );
}

export default NavBar;
