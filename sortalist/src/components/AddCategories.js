import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const AddCategories = ({ gameData, setGameData, onNext }) => {
  const [categories, setCategories] = useState(["", ""]); // Initialize with two empty strings

  const addCategory = () => {
    setCategories([...categories, ""]);
  };

  const removeCategory = (indexToRemove) => {
    setCategories(categories.filter((_, index) => index !== indexToRemove));
  };

  const handleChange = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = value;
    setCategories(updatedCategories);
  };

  const handleNext = () => {
    if (categories.length < 2 || categories.length > 5) {
      alert("Please enter between 2 and 5 categories.");
      return;
    }
    setGameData({ ...gameData, categories });
    onNext();
    // Move to the next step
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
      <Typography variant="h3" fontWeight="bold">
        Categories:
      </Typography>
      {categories.map((category, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}
        >
          <TextField
            label={`Category ${index + 1}`}
            value={category}
            onChange={(e) => handleChange(index, e.target.value)}
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
