import React from "react";
import { Box, Button, Typography } from "@mui/material";

function Instructions() {
  return (
    <Box>

      <Box position="absolute" top={0} right={0}>
        <img
          src="/images/PurpleBlob.png"
          alt="Purple Blob"
          style={{ width: "100px", height: "100px" }}
        />
      </Box>

      <Box position="absolute" bottom={0} left={0}>
        <img
          src="/images/PinkBlob.png"
          alt="PinkBlob"
        />
      </Box>

      
      <Box position="absolute" bottom={0} right={0}>
        <img
          src="/images/GreenBlob.png"
          alt="GreenBlob"
        />
      </Box>

      <Typography variant="h2" align="center" gutterBottom>
        How It Works
      </Typography>

      {/* Dev and boxes in a row */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        {/* Dev box */}

        {/* Boxes in a column */}
        <Box display="flex" flexDirection="row">
          {/* Easy to use box */}
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
              Tailor your game to perfectly match your presentation and
              captivate your audience!
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
              Empower your audience with engaging brain-teasers that educate and
              entertain!
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Get started button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Box>
    </Box>
  );
}

export default Instructions;
