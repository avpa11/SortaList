import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AddCategories = ({ gameData, setGameData, onNext, onPrevious }) => {
  const [categories, setCategories] = useState(
    gameData.categories.length > 0
      ? gameData.categories.map((category) => category.name)
      : ["", ""]
  );  


  const addCategory = () => {
    setCategories([...categories, ""]);
  };

  const removeCategory = (indexToRemove) => {
    setCategories(categories.filter((_, index) => index !== indexToRemove));
  };

  const handleValueChange = (index, value) => {
    // Update categories
    const updatedCategories = [...categories];
    updatedCategories[index] = { name: value };
    setCategories(updatedCategories);

    // Update gameData.categories
    const updatedGameData = [...gameData.categories];
    updatedGameData[index] = { name: value };
    setGameData({ ...gameData, categories: updatedGameData });

  };
  

  const handleNext = () => {
    if (categories.length < 2 || categories.length > 5) {
      alert("Please enter between 2 and 5 categories.");
      return;
    }

    setGameData({ ...gameData });
    onNext();
  };

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
          Categories:
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)" }}
        >
          Add a minimum of 2 categories for players to sort.
        </Typography>
      </Box>
      
      {categories.map((category, index) => (
        <Box >
          <Typography
            style={{ color: "#1F64FF", fontWeight: "bold" }}
          >{`Category ${index + 1}`}</Typography>
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}
          >
            <TextField
              label={`Category ${index + 1}`}
              value={gameData.categories && gameData.categories[index] ? gameData.categories[index].name : ''}
              onChange={(e) => handleValueChange(index, e.target.value)}
              
              variant="outlined"
              margin="normal"
              fullWidth
              
            />
            {index >= 2 && ( // Only show the "Remove Category" button for categories beyond the first two
              <Button
                variant="contained"
                onClick={() => removeCategory(index)}
                sx={{ ml: 2 }}
              >
                <RemoveCircleOutlineIcon />
              </Button>
            )}
          </Box>
        </Box>
      ))}
      <Box mt={2} mb={5}>
        <Typography
          variant="body1"
          align="center"
          sx={{ cursor: "pointer" }}
          onClick={addCategory}
        >
          + New Category
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={handleNext}
        disabled={categories.length < 2}
      >
        Next
      </Button>
    </Box>
  );
};

export default AddCategories;
