import React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MotionIcon from "../components/MotionIcon";
import Blob from "../components/Blob";

const NotFoundPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const blobsData = [
    {
      top: 10,
      left: 20,
      size: 130,
      color: "linear-gradient(135deg, #72EDF2 10%, #5151E5 100%)",
      zIndex: -1,
    },
    {
      top: 40,
      left: 60,
      size: 150,
      color: "linear-gradient(135deg, #F7971E 10%, #FFD200 100%)",
    },
    {
      top: 70,
      left: 30,
      size: 250,
      color: "linear-gradient(135deg, #ffcef0 10%, #ff4cc6 100%)",
    },
    {
      top: 50,
      left: 80,
      size: 100,
      color: "linear-gradient(135deg, #FEB692 10%, #EA5455 100%)",
    },
    {
      top: 20,
      left: 80,
      size: 180,
      color: "linear-gradient(135deg, #ABDCFF 10%, #c200ff 100%)",
    },
  ];

  return (
    <>
      <Box
        display="flex"
        flexDirection={isMobile ? "column-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={isMobile ? 5 : 2}
        overflow={"hidden"}
        height={"90vh"}
      >
        <Grid container>
          <Grid item xs={12} my={5} p={3}>
            <Typography variant="h2" component="h1" mt={5}>
              404 Not Found
            </Typography>
            <Typography variant="body1">
              The page you are looking for does not exist...
            </Typography>
            <Box mt={2} display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
              >
                Go to Home
              </Button>
            </Box>
            <MotionIcon />
          </Grid>
        </Grid>
        {!isMobile && (
          <>
            {blobsData.map((blob, index) => (
              <Blob
                key={index}
                top={blob.top}
                left={blob.left}
                size={blob.size}
                color={blob.color}
                animationProps={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default NotFoundPage;
