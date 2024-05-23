import React, { useState } from 'react';
import { Box, Menu, MenuItem  } from "@mui/material";
import { firestore } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const GameOptionsMenu = ({ gameData, uniqueID, setGameData, handleCreateNewGame, fetchGameData}) => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    const copiedGameData = gameData
    handleCreateNewGame(copiedGameData);
    handleClose();
  };

  const deleteGame = async (gameId) => {
    try {
      await deleteDoc(doc(firestore, "games", uniqueID));
      console.log("Document successfully deleted!");
      
      // Optionally, update gameData state after deleting the document
      setGameData(gameData.filter((game) => game.id !== gameId));
      fetchGameData();

    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleDelete = () => {
    deleteGame(uniqueID)
    // Handle delete action
    handleClose();
  };


  const handleDetails = () => {
    console.log(gameData)
    console.log(uniqueID)
    // Handle delete action
    handleClose();
  };
  return (
    <Box>
      <Box mb={5} ml={2}>
        <MoreVertIcon onClick={handleClick} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCopy}>Copy</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleDetails}>Details</MenuItem>
      </Menu>
    </Box>
  );
};

export default GameOptionsMenu;
