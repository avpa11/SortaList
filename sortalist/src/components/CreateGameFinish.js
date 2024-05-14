// Step3.js
import React, { useState } from 'react';

const CreateGameFinish = ({ gameData, setGameData }) => {
  const [words, setWords] = useState([]);

  const addWord = () => {
    setWords([...words, '']);
  };

  const handleChange = (index, value) => {
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
  };

  const handleNext = () => {
    setGameData({ ...gameData, words });
    // Move to the next step
  };

  return (
    <div>
      <h2>Add Words:</h2>
      {gameData.categories.map((category, index) => (
        <div key={index}>
          <h3>{category}</h3>
          {words.map((word, idx) => (
            <input
              key={idx}
              type="text"
              value={word}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          ))}
          <button onClick={addWord}>Add Word</button>
        </div>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default CreateGameFinish;
