import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const RankingWordsInput = ({
  initialWords,
  onUpdate,
}) => {
  const [words, setWords] = useState(
    initialWords.length > 0 ? initialWords : [""]
  );

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
      {words.map((word, idx) => (
        <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="h6" sx={{ width: "30px", textAlign: "center" }}>{idx + 1}</Typography>
          <TextField
            value={word}
            onChange={(e) => handleChange(idx, e.target.value)}
            variant="outlined"
            sx={{ bgcolor: "white" }}
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

export default RankingWordsInput;
