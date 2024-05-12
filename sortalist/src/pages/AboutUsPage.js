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

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      {!isMobile && (
        <Box position="absolute" top={0} right={300} zIndex={-1} sx={{}}>
          <img src="/images/PinkBlob2.png" alt="Pink Blob2" />
        </Box>
      )}

      {!isMobile && (
        <Box position="fixed" bottom={0} left={0} zIndex={0} sx={{}}>
          <img src="/images/GreenBlob2.png" alt="Green Blob2" />
        </Box>
      )}

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
                    <img src="/images/logo3.png" alt="Pink logo3" />
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
                >
                  <img src="/images/logo3.png" alt="Pink logo3" />
                  <Typography variant="h4" fontWeight="bold" mt={-5}>
                    SortaList
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      {!isMobile && (<Box m={10} />)}
      <Typography variant="body1" paragraph pl={isMobile ? 2 : 7}>
        SortaList is your ticket to unforgettable presentations that are
        anything but boring. Elevate your lectures and captivate your audience
        with ease.
      </Typography>
      <Box bgcolor="#FFD700" zIndex={-1} flex={1} p={5} minHeight="50vh">
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
            <Box gap={2} zIndex={1}>
              <Box m={3} />
              <Box
                component="img"
                alt="Twitter Icon"
                src="/images/TwitterLogo.png"
                style={{ width: 32, height: 32, marginRight: 20 }}
              />

              <Box
                component="img"
                alt="LinkedIn Icon"
                src="/images/LinkedinLogo.png"
                sx={{ width: 32, height: 32 }}
              />
            </Box>
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
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="What is it"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="How it works"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
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
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Blog"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Careers"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
                />
              </ListItem>
            </List>
          </Box>
          <Box>
            <List>
              <ListItem>
                <ListItemText
                  variant="h5"
                  primary="Legal"
                  primaryTypographyProps={{
                    variant: "h5",
                    color: "white",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Terms & Conditions"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Privacy & Policy"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Contact"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
                />
              </ListItem>
            </List>
          </Box>
          <Box>
            <List>
              <ListItem>
                <ListItemText
                  variant="h5"
                  primary="Help"
                  primaryTypographyProps={{
                    variant: "h5",
                    color: "white",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="FAQ"
                  primaryTypographyProps={{ variant: "h6", color: "#FFFFFF" }}
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
