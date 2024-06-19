import React from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import RankingWordsInput from "./RankingWordsInput";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { gamesCol } from "../firebase/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getUserID } from "../redux/slices/user";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

const AddRankingWords = ({ gameData, setGameData, onNext, onPrevious }) => {
  const userID = useSelector(getUserID);
  const theme = useTheme();
  const createRankingGame = async () => {
    try {
      const gamesRef = doc(gamesCol, gameData.gameID);
      await setDoc(gamesRef, {
        rankedWords: gameData.rankedWords,
        gameType: gameData.gameType,
        gameTitle: gameData.title,
        creatorID: userID,
        gameID: gameData.gameID,
        timestamp: serverTimestamp(),
      });
      console.log("Game data written to the database successfully!");
    } catch (error) {
      console.error("Error writing game data to the database:", error);
    }
    onNext();
  };

  const handleUpdateWords = (updatedWords) => {
    setGameData((prevGameData) => ({
      ...prevGameData,
      rankedWords: updatedWords,
    }));
  };

  // const handlePrevious = () =>{
  //     setGameData({ ...gameData});
  //     onPrevious(); // Navigate back to the AddCategories component
  // }

  return (
    <Grid style={{ width: "100%" }} container spacing={2}>
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
        <ArrowBackIosIcon sx={{ mb: 2 }} onClick={onPrevious} />

        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Ranked Items
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: theme.palette.grey[500] }}
            gutterBottom
          >
            Add Items to be ranked.
          </Typography>
        </Box>

          <Box >
            <RankingWordsInput
              initialWords={gameData.rankedWords || []}
              onUpdate={handleUpdateWords}
            />
          </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={createRankingGame}
            startIcon={<VideogameAssetIcon />}
          >
            Create Game
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default AddRankingWords;
