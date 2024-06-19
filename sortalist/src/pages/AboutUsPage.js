import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MotionIcon from "../components/MotionIcon";
import { useNavigate } from "react-router-dom";
import Blob from "../components/Blob";

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const blobsData = [
    {
      top: 10,
      left: 20,
      size: isMobile ? 50 : 200,
      color: "linear-gradient(135deg, #72EDF2 10%, #5151E5 100%)",
      zIndex: -1,
    },
    {
      top: 40,
      left: 60,
      size: isMobile ? 60 : 150,
      color: "linear-gradient(135deg, #F7971E 10%, #FFD200 100%)",
      zIndex: -1,
    },
    {
      top: 70,
      left: 30,
      size: isMobile ? 100 : 250,
      color: "linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)",
      zIndex: -1,
    },
    {
      top: 50,
      left: 80,
      size: isMobile ? 20 : 100,
      color: "linear-gradient(135deg, #FEB692 10%, #EA5455 100%)",
      zIndex: -1,
    },

    {
      top: 15,
      left: 10,
      size: isMobile ? 70 : 220,
      color: "linear-gradient(135deg, #FFD200 10%, #F7971E 100%)",
      zIndex: -1,
    },
    {
      top: 35,
      left: 50,
      size: isMobile ? 30 : 140,
      color: "linear-gradient(135deg, #EA5455 10%, #FEB692 100%)",
      zIndex: -1,
    },
    {
      top: 65,
      left: 40,
      size: isMobile ? 55 : 230,
      color: "linear-gradient(135deg, #5151E5 10%, #72EDF2 100%)",
      zIndex: -1,
    },
  ];
  return (
    <Box display="flex" flexDirection="column" minHeight="93vh">
      <Box>
        <Box pt={5} pl={isMobile ? 2 : 7}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              textAlign: isMobile ? "center" : "left", // Center-align text on mobile, left-align otherwise
            }}
          >
            About Us
          </Typography>
          <Box pt={isMobile ? 0 : 7}>
            <Box>
              <Box display="flex" flexDirection={isMobile ? "column" : "row"}>
                <Box>
                  {isMobile && (
                    <Box
                      mb={3}
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <MotionIcon />
                      <Typography variant="h4" fontWeight="bold" mt={-5}>
                        SortaList
                      </Typography>
                    </Box>
                  )}

                  <Typography
                    variant="body1"
                    style={{ marginBottom: isMobile ? 20 : 1 }}
                  >
                    Imagine effortlessly captivating your audience from the very
                    start.
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    style={{ marginBottom: isMobile ? 20 : 1 }}
                  >
                    SortaList transforms the way you engage with your listeners,
                    turning word
                    <br /> sorting into a dynamic and interactive game.
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    style={{ marginBottom: isMobile ? 20 : 1 }}
                  >
                    Welcome to a new era of presentations where breaking the ice
                    is as easy as a blink.
                  </Typography>
                </Box>

                {!isMobile && (
                  <Box
                    mt={-10}
                    sx={{
                      marginLeft: "auto",
                      textAlign: "center",
                    }}
                    px={5}
                  >
                    <MotionIcon />
                    <Typography variant="h4" fontWeight="bold" mt={-5}>
                      SortaList
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        {!isMobile && <Box m={10} />}
        <Typography variant="body1" paragraph pl={isMobile ? 2 : 7} pb={5}>
          SortaList is your ticket to unforgettable presentations that are
          anything but boring. Elevate your lectures and captivate your audience
          with ease.
        </Typography>
        {blobsData.map((blob, index) => (
          <Blob
            key={index}
            top={blob.top}
            left={blob.left}
            size={blob.size}
            color={blob.color}
            zIndex={blob.zIndex}
            animationProps={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
              transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </Box>
      <Box bgcolor="#FFD700" flex={1} p={5} zIndex={2}>
        <Box
          p={3}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column" mb={2} zIndex={1}>
            <Box m={1} />
            <Typography variant="h4" fontWeight="bold" color="white">
              Need help with
              <br />
              anything?
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" flexDirection="column">
            <List>
              <ListItem>
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{
                    variant: "h5",
                    color: "white",
                  }}
                  onClick={() => navigate("/")}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="How it works"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
                  onCanPlay={() => navigate("/how-it-works")}
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <List>
              <ListItem>
                <ListItemText
                  variant="h5"
                  primary="Company"
                  primaryTypographyProps={{
                    variant: "h5",
                    color: "white",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="About"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
                  onClick={() => navigate("/about-us")}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default AboutPage;
