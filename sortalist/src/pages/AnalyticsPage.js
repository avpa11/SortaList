import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import GameBox from "../components/AnalyticsGameBox";

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [selectedGameTitle, setSelectedGameTitle] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const db = getFirestore();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCardClick = async (gameID, gameTitle) => {
    try {
      const q = query(collection(db, 'gameResults'), where('sessionId', '==', gameID));
      const querySnapshot = await getDocs(q);
      const totalResults = querySnapshot.size;
      let results = 0;

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.numWrong && data.numWrong > 0) {
          results++;
        }
      });
      setGameResults(results);
      setSelectedGameTitle(gameTitle);
      setTotalResults(totalResults);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching game results:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box p={3}>
      {!isMobile && (
        <Box position="absolute" bottom={0} left={0} zIndex={-1}>
          <img src="/images/PurpleBlob2.png" alt="PutpleBlob2" />
        </Box>
      )}

      {!isMobile && (
        <Box position="fixed" bottom={0} right={0} zIndex={-1}>
          <img src="/images/OrangeBlob2.png" alt="OrangeBlob2" />
        </Box>
      )}

      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Games
        </Typography>
        <Box>
          <Typography fontWeight="bold" ml={3}>
            Sessions
          </Typography>
          <Divider
            sx={{
              my: 2,
              backgroundImage: `linear-gradient(to right, #1F64FF, #1F64FF 11%, #F5F6FA 11%)`,
              backgroundSize: "100% 2px",
              backgroundRepeat: "no-repeat",
              height: 2,
            }}
          />
        </Box>

        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box display="flex" flexDirection="column" width={"auto"}>
        <GameBox searchTerm={searchTerm} handleCardClick={handleCardClick} />
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{selectedGameTitle}</DialogTitle>
        <DialogContent>
          {totalResults > 0 ? (
            <>
            <Typography>Number of Players: {totalResults}</Typography>
            <Typography>Number of Games Lost: {gameResults}</Typography>
          </>
          ) : (
            <Typography>No results found</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;
