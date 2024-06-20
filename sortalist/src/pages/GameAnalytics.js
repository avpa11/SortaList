// GameAnalytics.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const GameAnalytics = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const { gameTitle, totalResults, results } = location.state;
  const correct =  totalResults - results;
  
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
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h3" fontWeight="bold" mt={7} pl={isMobile ? 0 : 5}>
        {gameTitle}
      </Typography>
    </Box>
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
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
          <Box m={2} />

          <Typography variant="body1" align="center">
          {totalResults} players joined your game!
          </Typography>
        </Box>

        <Box justifyContent="center" alignItems="center" p={2} mb={2}>
          <Box
            component="img"
            alt="Customize Icon"
            src="/images/CustomizeIcon.png"
            sx={{ display: "block", margin: "auto" }}
          />
          <Box m={2} />
          <Box m={2} />

          <Typography variant="body1" align="center">
            {correct} players got all answers right!
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
          <Box m={2} />
          <Typography variant="body1" align="center">
            {results} players did not get all answers right!
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

};

export default GameAnalytics;
