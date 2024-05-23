import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Drawer, Box, Button, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom"; // Import Link for navigation
import GameOptionsMenu from "./gameOptionsMenu"; // Adjust the path as needed

function GameBox({ handleCreateNewGame }) {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gamesCollectionRef = collection(firestore, "games");
        const snapshot = await getDocs(gamesCollectionRef);
        const initialGameData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGameData(initialGameData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    const unsubscribe = onSnapshot(collection(firestore, "games"), (snapshot) => {
      const updatedGameData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGameData(updatedGameData);
    });
    fetchGameData();
    return () => unsubscribe();

  }, []); // Trigger fetchGameData() whenever gameId changes

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid style={{ width: "100%" }} container spacing={2}>
      {gameData.map((game) => (
        <Grid style={{ width: "100%" }} item key={game.id}>
          <Card variant="outlined">
            <CardContent
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F5F6FA",
              }}
            >
              <Box>
                <Typography variant="h5" component="h2">
                  {game.gameTitle}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Session ID: {game.gameID}
                </Typography>
              </Box>
              <Box style={{ marginLeft: "auto" }}>
                <Link to={`/play/${game.id}`}>
                  <Button variant="contained" color="primary">
                    Play
                  </Button>
                </Link>
              </Box>
              <Box mb={5} ml={2}>
                <GameOptionsMenu
                  gameData={{
                    gameTitle: game.gameTitle,
                    gameCategories: game.categories,
                    creatorID: game.creatorID,
                    gameID: game.gameID,
                  }}
                  uniqueID={game.uniqueID}
                  setGameData={setGameData}
                  handleCreateNewGame={handleCreateNewGame}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default GameBox;
