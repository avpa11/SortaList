import React from "react";
import { Button, Box, Typography, Divider } from "@mui/material";
import CategoryWordsInput from "./CategoryWordsInput";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import {firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AddWords = ({ gameData, setGameData, onNext, onPrevious }) => {
    const createGame = async () => {
        try {
          await setDoc(doc(firestore, "games", gameData.uniqueID), {
            categories: gameData.categories,
            gameTitle: gameData.title,
            creatorID: "TEST",
            gameID: "TEST",
            uniqueID: gameData.uniqueID
          });
          console.log("Game data written to the database successfully!");
    
        } catch (error) {
          console.error("Error writing game data to the database:", error);
        }
        onNext()
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

<ArrowBackIosIcon   sx={{ mb: 2}} onClick={onPrevious} />

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
            categoryName={category.name}
            category={category}
            initialWords={category.words || []}
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
