// Step1.js
import React from 'react';
import { Button, Box, Tab, Tabs } from '@mui/material';

const CreateGameStart = ({ gameData, setGameData, onNext }) => {
  const handleChange = (e) => {
    setGameData({ ...gameData, title: e.target.value });
  };

  return (
    <div>
      {/* Tabs for indicating current step */}
      <Tabs value={1} aria-label="game creation steps">
        <Tab label="Step 1" />
        <Tab label="Step 2" disabled />
        <Tab label="Step 3" disabled />
        {/* Add more tabs for additional steps */}
      </Tabs>

      {/* Your form or input fields */}
      <div>
        <label>Game Title:</label>
        <input type="text" value={gameData.title} onChange={handleChange} />
      </div>

      {/* Next step button */}
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={onNext}>
          Next Step LOL
        </Button>
      </Box>
    </div>
  );
};

export default CreateGameStart;