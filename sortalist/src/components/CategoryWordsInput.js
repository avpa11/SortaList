import React, { useState } from "react";
import { Button, TextField, Box, Typography, Divider } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CategoryWordsInput = ({ index, category, initialWords, onUpdate }) => {
  const [words, setWords] = useState(initialWords);

  const addWord = () => {
    setWords([...words, ""]);
  };

  const removeWord = (indexToRemove) => {
    setWords(words.filter((_, index) => index !== indexToRemove));
  };

  const handleChange = (index, value) => {
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
    onUpdate(updatedWords);
  };

  return (
    <Box mb={4}>
      <Typography variant="h6">
        <span style={{ color: "#1F64FF", fontWeight: "bold" }}>
          Category {index + 1}: {category}
        </span>
      </Typography>
      {words.map((word, idx) => (
        <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <TextField
            value={word}
            onChange={(e) => handleChange(idx, e.target.value)}
            variant="outlined"
            sx={{ bgcolor: "white" }} // Set the desired background color
            fullWidth
          />
          {idx > 0 && (
            <Button
              variant="outlined"
              onClick={() => removeWord(idx)}
              sx={{ ml: 1 }}
            >
              <RemoveCircleOutlineIcon />
            </Button>
          )}
        </Box>
      ))}

      <Typography
        variant="body1"
        align="center"
        sx={{ cursor: "pointer" }}
        onClick={addWord}
      >
        + New Word
      </Typography>

    </Box>
    
  );
};

export default CategoryWordsInput;
