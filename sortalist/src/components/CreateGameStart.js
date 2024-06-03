// Step1.js
import React from "react";
import { Button, TextField, Box, Typography, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useTheme } from "@emotion/react";

const CreateGameStart = ({ gameData, setGameData, onNext, handleFinish, onSortingGame  }) => {
  const theme = useTheme();
  const handleChange = (e) => {
    setGameData({ ...gameData, title: e.target.value });
  };

  const handleGameTypeChange = (e) => {
    setGameData({ ...gameData, gameType: e.target.value });
  };

  const finishGameCreation = () => {
    handleFinish();
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
      gameID: generateGameID(),
    };

    // Set updated gameData
    setGameData(updatedGameData);

    // Proceed to the next step
    onNext();
  };

  return (
    <Grid
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
      container
      spacing={2}
    >
      <Box
        bgcolor={theme.palette.grey[100]}
        padding={3}
        borderRadius={5}
        display={"flex"}
        flexDirection={"column"}
        sx={{
          width: "100%",
          minWidth: "200px",
        }}
      >
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Game Title:
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: theme.palette.grey[500] }}
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

        <Box mb={2} mt={3}>
          <FormControl component="fieldset">
          <FormLabel sx={{color: 'black', typography: 'h5', fontWeight: 'bold', mb: 1 }} variant="h5" fontWeight="bold" gutterBottom>
            Game Type:
          </FormLabel>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: theme.palette.grey[500] }}
            gutterBottom
            mb={2}
          >
            Select the type of game 
          </Typography>
            <RadioGroup
              aria-label="game type"
              name="gameType"
              value={gameData.gameType || ""}
              onChange={handleGameTypeChange}
            >
              <FormControlLabel value="Sorting" control={<Radio />} label="Sorting Game" />
              <FormControlLabel value="Ranking" control={<Radio />} label="Ranking Game" />
            </RadioGroup>
          </FormControl>
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

      <Box display="flex" justifyContent="center" p={3}>
        <Button variant="outlined" mt={3} onClick={() => finishGameCreation()}>
          Cancel
        </Button>
      </Box>
    </Grid>
  );
};
export default CreateGameStart;
