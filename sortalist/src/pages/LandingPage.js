import React, { useState } from "react";
import {
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsUserAuth, signUpUser } from "../redux/slices/user";
import Loading from "../components/Loading";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isUserAuth = useSelector(getIsUserAuth);
  const [isformSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    var provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        dispatch(
          signUpUser({
            email: user.email,
            uid: user.uid,
            providerId: user.providerId,
            providerData: user.providerData,
          })
        );
        setFormSubmitting(false);
        // redirect the user to the landing authenticated page
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        setFormError("Sorry, something went wrong. Please try again later.");
        console.log(formError);
      });
  };

  return (
    <>
      {isformSubmitting && <Loading />}
      <Box
        display="flex"
        flexDirection={isMobile ? "column-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={isMobile ? 5 : 2}
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/images/background_lp.png"
          })`,
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Cover the entire container
          height: "100vh", // Full height of the viewport
          width: "100vw", // Full width of the viewport
        }}
      >
        <Grid container>
          <Grid item xs={12} md={4} my={5} p={3}>
            <Typography variant="h2" component="h1" mt={5}>
              Where Words Meet <strong>Play</strong>
            </Typography>
            <Typography variant="body1">
              Collaborate with your audience & make your presentations more
              interactive!
            </Typography>
            {!isUserAuth ? (
              <Box mt={2} display="flex" gap={2}>
                <Button variant="contained" color="primary">
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={signInWithGoogle}
                >
                  Sign in with Google
                </Button>
              </Box>
            ) : (
              <Box mt={2} display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={8} pt={-5}>
            <img
              src="/images/landing_image.png"
              alt="Landing"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
