import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function Instructions() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      {!isMobile && (
        <Box position="absolute" top={0} right={0} zIndex={-2}>
          <img src="/images/PurpleBlob.png" alt="Purple Blob" />
        </Box>
      )}

      {!isMobile && (
        <Box position="absolute" bottom={0} left={0} zIndex={-1}>
          <img src="/images/PinkBlob.png" alt="PinkBlob" />
        </Box>
      )}

      {!isMobile && (
        <Box position="absolute" bottom={0} right={0} zIndex={-1}>
          <img src="/images/GreenBlob.png" alt="GreenBlob" />
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" fontWeight="bold" pl={isMobile ? 0 : 5}>
          How It Works
        </Typography>
      </Box>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={isMobile ? "column" : "row"}
        >
          <Box justifyContent="center" alignItems="center" p={2} mb={2}>
            <Box
              component="img"
              alt="Envelope Icon"
              src="/images/EnvelopeIcon.png"
              sx={{ display: "block", margin: "auto" }}
            />
            <Box m={2} />

            <Typography variant="h6" align="center">
              Easy to Use
            </Typography>
            <Box m={2} />

            <Typography variant="body1" align="center">
              Start the fun with just a link!
            </Typography>
            <Typography variant="body1" align="center">
              Share it with your audience to get the game going!
            </Typography>
          </Box>

          {/* Customization box */}
          <Box justifyContent="center" alignItems="center" p={2} mb={2}>
            <Box
              component="img"
              alt="Customize Icon"
              src="/images/CustomizeIcon.png"
              sx={{ display: "block", margin: "auto" }}
            />
            <Box m={2} />

            <Typography variant="h6" align="center">
              Customization
            </Typography>
            <Box m={2} />

            <Typography variant="body1" align="center">
              Tailor your game to perfectly match your presentation <br />
              and captivate your audience!
            </Typography>
          </Box>

          {/* Educate box */}
          <Box justifyContent="center" alignItems="center" p={2} mb={2}>
            <Box
              component="img"
              alt="Calender Icon"
              src="/images/CalenderIcon.png"
              sx={{ display: "block", margin: "auto" }}
            />
            <Box m={2} />

            <Typography variant="h6" align="center">
              Educate
            </Typography>
            <Box m={2} />

            <Typography variant="body1" align="center">
              Empower your audience with engaging <br />
              brain-teasers that educate and entertain!
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Get started button */}
      <Box display="flex" justifyContent="center" mt={4}  pl={isMobile ? 0 : 5}>
        <Button variant="contained" color="primary" style={{ width: "200px" }}>
          Get Started
        </Button>
      </Box>
    </Box>
  );
}

export default Instructions;
