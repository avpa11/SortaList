import React, { useState } from 'react';

import { Box, Button } from "@mui/material";
import SideNavBar from "../components/SideNavBar";
import GameBox from "../components/GameBox";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateGameStart from '../components/CreateGameStart';
import FinishCreateGame from '../components/CreateGameFinish';
import AddCategories from '../components/AddCategories';
import AddWords from '../components/AddWords';

const DashboardPage = () => {
  const [currentStep, setCurrentStep] = useState(0); // Initialize current step
  const [creatingNewGame, setCreatingNewGame] = useState(false); // Define creatingNewGame state variable

  const handleCreateNewGame = () => {
    setCurrentStep(1); // Start with Step 1 (CreateGameStart)
    setCreatingNewGame(true); // Set creatingNewGame to true when creating a new game
  };

  const [gameData, setGameData] = useState({
    // Initialize empty game data object to store data collected from steps
    // Modify this object to match the structure of your game data
    title: '',
    categories: [],
    // Add more properties as needed
  });

 const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    // Logic to handle final step (e.g., submitting data to server)
    // You can also reset the state or redirect the user after finishing
    console.log('Game creation finished:', gameData);
  };

  // Render the appropriate step component based on the current step
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <CreateGameStart gameData={gameData} setGameData={setGameData} onNext={handleNextStep} />;
      case 2:
        return <AddCategories gameData={gameData} setGameData={setGameData} onNext={handleNextStep}/>;
      case 3:
        return <AddWords gameData={gameData} setGameData={setGameData} onNext={handleNextStep}/>;
      case 4:
        return <FinishCreateGame gameData={gameData} setGameData={setGameData} onNext={handleNextStep} />;
      default:
        return null;
    }
  };

  return (
    <Box p={3}>
              <Box mb={3}>
          <Button xs={10}
            variant="contained"
            style={{ backgroundColor: "#E1E2E9", width: "100%" }}
            onClick={handleCreateNewGame} // Set creatingNewGame to true when button is clicked
            startIcon={<AddCircleIcon />}
          >
            Create New Game
          </Button>
        </Box>
      <Box display="flex" flexDirection="column" width={"100%"}>
            {/* <SideNavBar /> */}
            {!creatingNewGame && (
      <>
        <GameBox/>
      </>
    )}
      {creatingNewGame && renderStepComponent()}
      </Box>
    </Box>
  );
};

export default DashboardPage;
