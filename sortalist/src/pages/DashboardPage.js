import React, { useState } from "react";

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GameBox from "../components/GameBox";
import CreateGameStart from "../components/CreateGameStart";
import FinishCreateGame from "../components/CreateGameFinish";
import AddCategories from "../components/AddCategories";
import AddWords from "../components/AddWords";
import AddRankingWords from "../components/AddRankingWords";
import Divider from "@mui/material/Divider";

const DashboardPage = () => {
  const [currentStep, setCurrentStep] = useState(0); // Initialize current step
  const [creatingNewGame, setCreatingNewGame] = useState(false); // Define creatingNewGame state variable

  const [gameData, setGameData] = useState({
    // Initialize empty game data object to store data collected from steps
    // Modify this object to match the structure of your game data

    title: "",
    categories: [],
    revealAnswers: false,
    allowMultipleSubmissions: false,
    timeLimit: 0, // in minutes
    // Add more properties as needed
  });

  const handleCreateNewGame = (initialGameData) => {
    setCurrentStep(1); // Start with Step 1 (CreateGameStart)
    setCreatingNewGame(true); // Set creatingNewGame to true when creating a new game
    if (initialGameData) {
      // If initialGameData is provided, initialize gameData with it
      setGameData({
        title: initialGameData.gameTitle || "", // Set title from initialGameData or empty string if not provided
        categories: initialGameData.categories || [], // Set categories from initialGameData or empty array if not provided
        revealAnswers: initialGameData.revealAnswers || false,
        allowMultipleSubmissions: initialGameData.allowMultipleSubmissions || false,
        timeLimit: initialGameData.timeLimit || '',
        // Add more properties as needed
      });
    } else {
      // If no initialGameData is provided, initialize gameData with default values
      setGameData({
        title: "",
        categories: [],
        revealAnswers: false,
        allowMultipleSubmissions: false,
        timeLimit: '',
        // Add more properties as needed
      });
    }
  };

  const handleNextStep = () => {
      if (gameData.gameType === "Ranking" && currentStep === 2) {
      setCurrentStep(currentStep + 2); // Skip to the step after categories
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    setGameData({ title: "", categories: [] });
    setCreatingNewGame(false);
  };

  // Render the appropriate step component based on the current step
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CreateGameStart
            gameData={gameData}
            setGameData={setGameData}
            onNext={handleNextStep}
            handleFinish={handleFinish}
          />
        );
      case 2:
        if (gameData.gameType === "Sorting") {
          return (
            <AddCategories
              gameData={gameData}
              setGameData={setGameData}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />
          );
        } else if (gameData.gameType === "Ranking") {
          return (
            <AddRankingWords
              gameData={gameData}
              setGameData={setGameData}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />
          );
        }
        break;
      case 3:
        return (
          <AddWords
            gameData={gameData}
            setGameData={setGameData}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        );
      case 4:
        return (
          <FinishCreateGame gameData={gameData} handleFinish={handleFinish} />
        );
      default:
        return null;
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={3}>
      {!isMobile && (
        <Box position="absolute" bottom={0} left={0} zIndex={-1} sx={{}}>
          <img src="/images/PurpleBlob2.png" alt="PutpleBlob2" />
        </Box>
      )}

      {!isMobile && (
        <Box position="fixed" bottom={0} right={0} zIndex={-1} sx={{}}>
          <img src="/images/OrangeBlob2.png" alt="OrangeBlob2" />
        </Box>
      )}

      {!creatingNewGame && (
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Games
          </Typography>
          <Box>
            <Typography fontWeight="bold" ml={3}>
              Sessions
            </Typography>
            <Divider
              sx={{
                my: 2,
                backgroundImage: `linear-gradient(to right, #1F64FF, #1F64FF 11%, #F5F6FA 11%)`, // Blue for the first 50%, then grey
                backgroundSize: "100% 2px", // Adjust height of the gradient line
                backgroundRepeat: "no-repeat",
                height: 2, // Adjust height of the divider
              }}
            />
          </Box>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#E1E2E9",
              width: "100%",
              color: "black",
              fontWeight: "bold",
            }}
            onClick={() => handleCreateNewGame()} // Call handleCreateNewGame without initial data
            disableElevation={true}
          >
            + New Game
          </Button>
        </Box>
      )}

      <Box display="flex" flexDirection="column" width={"auto"}>
        {!creatingNewGame && (
          <>
            <GameBox handleCreateNewGame={handleCreateNewGame} />
          </>
        )}
        {creatingNewGame && renderStepComponent()}
      </Box>
    </Box>
  );
};

export default DashboardPage;
