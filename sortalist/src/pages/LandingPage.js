import React from "react";
import {
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsUserAuth } from "../redux/slices/user";
import ContinueWithGoogleButton from "../components/ContinueWithGoogleButton";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isUserAuth = useSelector(getIsUserAuth);

  const navigate = useNavigate();

  return (
    <>
      <Box
        display="flex"
        flexDirection={isMobile ? "column-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={isMobile ? 5 : 2}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/onboarding")}
                >
                  Get Started
                </Button>
                <ContinueWithGoogleButton />
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
