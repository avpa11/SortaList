// Step1.js
import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const CreateGameStart = ({ gameData, setGameData, onNext, onPrevious }) => {
  const handleChange = (e) => {
    setGameData({ ...gameData, title: e.target.value });
  };

  const generateGameID = () => {
    // Generate a random 4-digit hexadecimal number
    const randomHex = Math.floor(Math.random() * 0x10000).toString(16);

    // Pad the number with zeros if necessary to ensure it has 4 digits
    const paddedHex = randomHex.padStart(4, "0");

    // Return the generated game ID
    return paddedHex.toUpperCase(); // Convert to uppercase for consistency
  };

  const startGameCreation = () => {
    // Update gameData to include gameID as "TEST"
    const updatedGameData = {
      ...gameData,
      gameID: "TEST",
      uniqueID: generateGameID(),
    };

    // Set updated gameData
    setGameData(updatedGameData);

    // Proceed to the next step
    onNext();
  };

  return (
    <Box>
      <Box
        bgcolor="#F5F6FA"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minWidth: "500px",
          padding: "50px",
          borderRadius: "12px",
        }}
      >
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Game Title:
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)" }}
            gutterBottom
          >
            Select a title for your game
          </Typography>
        </Box>
        <Box mb={2}>
          <TextField
            label="Game Title"
            variant="outlined"
            value={gameData.title}
            onChange={handleChange}
            fullWidth
            sx={{ bgcolor: "white" }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={startGameCreation}
            >
              Next Step
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CreateGameStart;
