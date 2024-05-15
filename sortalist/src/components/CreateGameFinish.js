import React from 'react';
import { Box, Typography, Button } from '@mui/material';
const CreateGameFinish = ({ gameData, setGameData }) => {

  return (
    <Box maxWidth={600} mx="auto" my={4} p={3} boxShadow={3} borderRadius={8}>
      <Typography variant="h4" mb={3}>Game Summary</Typography>
      <Typography variant="body1" mb={3}>
        Here is a summary of your game categories:
      </Typography>
      {gameData.categories.map((category, index) => (
        <Typography key={index} variant="body1" mb={1}>
          {category}
        </Typography>
      ))}
      <Button variant="contained" mt={3}>Next</Button>
    </Box>
  );
};

export default CreateGameFinish;
