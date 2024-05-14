import React from "react";
import { Button, Box, Typography, Divider } from "@mui/material";
import CategoryWordsInput from "./CategoryWordsInput";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import {firestore } from "../firebase/firebase";

const AddWords = ({ gameData, setGameData }) => {
  const createGame = () => {
    console.log(gameData)
    firestore.ref("games").push(gameData).then(() => {
        console.log("Game data written to the database successfully!");
      }).catch((error) => {
        console.error("Error writing game data to the database:", error);
      });
  };

  const handleUpdateWords = (category, updatedWords) => {
    // Update words for the specific category
    setGameData((prevGameData) => ({
      ...prevGameData,
      [category]: updatedWords,
    }));
  };

  return (
    <Box
      bgcolor="#F5F6FA"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "800px",
        padding: "150px",
        borderRadius: "12px",
      }}
    >
      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Words:
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)" }}
          gutterBottom
        >
          Add words relating to each category.
        </Typography>
      </Box>

      {gameData.categories.map((category, index) => (
        <Box key={index}>
          <CategoryWordsInput
            index={index}
            category={category}
            initialWords={gameData[category] || []}
            onUpdate={(updatedWords) =>
              handleUpdateWords(category, updatedWords)
            }
          />
          {index < gameData.categories.length - 1 && (
            <Divider sx={{ my: 2, borderColor: "grey", borderWidth: 1.3 }} />
          )}
        </Box>
      ))}
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        sx={{ width: '30%' }}
        variant="contained"
        onClick={createGame}
        startIcon={<VideogameAssetIcon />}
      >
        Create Game
      </Button>
    </Box>
    </Box>
  );
};

export default AddWords;
