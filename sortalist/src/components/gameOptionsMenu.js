import React, { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { firestore } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const GameOptionsMenu = ({ gameData, handleCreateNewGame }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    const copiedGameData = gameData;
    handleCreateNewGame(copiedGameData);
    // Handle copy action
    handleClose();
  };

  const deleteGame = async (gameId) => {
    console.log(gameId);
    try {
      await deleteDoc(doc(firestore, "games", gameId));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleDelete = () => {
    deleteGame(gameData.gameID);
    // Handle delete action
    handleClose();
  };

  return (
    <Box>
      <Box mb={5} ml={2}>
        <MoreVertIcon onClick={handleClick} />
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleCopy}>Copy</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default GameOptionsMenu;
