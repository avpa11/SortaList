import React, { useState, useEffect } from 'react';
import {firestore } from "../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom'; // Import Link for navigation

function GameBox() {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gamesCollectionRef = collection(firestore, 'games');
        const snapshot = await getDocs(gamesCollectionRef);
        console.log(snapshot)
       // Extract category names from each game

       if (!snapshot.empty) {
        const gamesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setGameData(gamesData);
      } else {
        console.log("No games found");
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

    fetchGameData();
  }, []); // Trigger fetchGameData() whenever gameId changes

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      {gameData.map(game => (
            // <Grid item xs={12} sm={6} md={4} lg={31} key={game.id}>

        <Grid item  key={game.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                {game.gameTitle}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Session ID: {game.gameID}
              </Typography>
              <Link to={`/play/${game.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                  Play
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default GameBox;
