import React from "react";
import { Button, Box, Typography, Divider, Grid } from "@mui/material";
import CategoryWordsInput from "./CategoryWordsInput";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { gamesCol } from "../firebase/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getUserID } from "../redux/slices/user";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

const AddWords = ({ gameData, setGameData, onNext, onPrevious }) => {
  const userID = useSelector(getUserID);
  const theme = useTheme();
  const createGame = async () => {
    try {
      const gamesRef = doc(gamesCol, gameData.gameID);
      await setDoc(gamesRef, {
        categories: gameData.categories,
        gameTitle: gameData.title,
        gameType: gameData.gameType,
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

  const handleUpdateWords = (category, updatedWords) => {
    setGameData((prevGameData) => ({
      ...prevGameData,
      [category.name]: {
        ...prevGameData[category.name], // Preserve other properties of the category
        words: updatedWords,
      },
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
            Words:
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: theme.palette.grey[500] }}
            gutterBottom
          >
            Add words relating to each category.
          </Typography>
        </Box>

        {gameData.categories.map((category, index) => (
          <Box key={index}>
            <CategoryWordsInput
              index={index}
              categoryName={category.name}
              category={category}
              initialWords={category.words || []}
              onUpdate={(updatedWords) =>
                handleUpdateWords(category, updatedWords)
              }
            />
            {index < gameData.categories.length - 1 && (
              <Divider
                sx={{
                  my: 2,
                  borderColor: theme.palette.grey[300],
                  borderWidth: 1.3,
                }}
              />
            )}
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={createGame}
            startIcon={<VideogameAssetIcon />}
          >
            Create Game
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default AddWords;
