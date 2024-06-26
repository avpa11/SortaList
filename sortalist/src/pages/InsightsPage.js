import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  Tab,
  Tabs
} from "@mui/material";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import GameBox from "../components/AnalyticsGameBox";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const InsightsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const db = getFirestore();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSessionClick = async (gameID, gameTitle) => {
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
      handleGameAnalyticsOpen(gameTitle,results,totalResults);
    } catch (error) {
      console.error('Error fetching game results:', error);
    }
  }; 

  const handleGameAnalyticsOpen = async (gameTitle,results,totalResults) => {
    navigate("/gameanalytics", {
      state: {
        gameTitle,
        totalResults,
        results,
      },
    });    
  };

  return (
    <Box p={3}>
      {!isMobile && (
        <Box position="absolute" bottom={0} left={0} zIndex={-1}>
          <img src="/images/PurpleBlob2.png" alt="PurpleBlob2" />
        </Box>
      )}

      {!isMobile && (
        <Box position="fixed" bottom={0} right={0} zIndex={-1}>
          <img src="/images/OrangeBlob2.png" alt="OrangeBlob2" />
        </Box>
      )}

      <Box mb={3}>
        <TextField
            label="Search Games"
            placeholder="Search games..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: isMobile ? '100%' : '30%', // Use isMobile to set width
              marginBottom: '20px', // Add some spacing below
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Games
        </Typography>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Sessions" />
          </Tabs>
      </Box>
      
      {tabValue === 0 && (
        <Box display="flex" flexDirection="column" width={"auto"}>
          <GameBox searchTerm={searchTerm} handleCardClick={handleSessionClick} />
        </Box>
      )}
    </Box>
  );
};

export default InsightsPage;
