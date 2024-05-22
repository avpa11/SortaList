import React, { useState, useEffect } from "react";
import { gamesCol } from "../firebase/firebase";
import {
  getCountFromServer,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import GameOptionsMenu from "./gameOptionsMenu"; // Adjust the path as needed
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { getUserID } from "../redux/slices/user";

function GameBox({ handleCreateNewGame }) {
  const theme = useTheme();

  const gamesPerPage = 1;
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const userID = useSelector(getUserID);

  const loadMoreGames = async () => {
    const next = query(
      gamesCol,
      where("creatorID", "==", userID),
      orderBy("timestamp", "desc"),
      startAfter(lastVisibleDoc),
      limit(gamesPerPage)
    );
    const documentSnapshots = await getDocs(next);

    if (!documentSnapshots.empty) {
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisibleDoc(lastVisible);

      const newGames = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames((games) => [...games, ...newGames]);
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onSnapshot(
      query(
        gamesCol,
        where("creatorID", "==", userID),
        orderBy("timestamp", "desc"),
        limit(gamesPerPage)
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          setLastVisibleDoc(lastVisible);

          const newGames = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGames(newGames);
          setCurrentPage(1);
        } else {
          setGames([]);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userID]);

  useEffect(() => {
    const fetchPageCount = async () => {
      const snapshot = await getCountFromServer(
        query(gamesCol, where("creatorID", "==", userID))
      );
      const totalPages = Math.ceil(snapshot.data().count / gamesPerPage);
      setTotalPages(totalPages);
    };

    fetchPageCount();
  }, [userID]);

  return (
    <Grid
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
      container
      spacing={2}
    >
      {games && games.length > 0 ? (
        <>
          {games.map((game) => (
            <Grid style={{ width: "100%" }} item key={game.id}>
              <Card
                variant=""
                sx={{
                  borderRadius: 5,
                  backgroundColor: theme.palette.grey[200],
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                  <Box mb={5} ml={2}>
                    <GameOptionsMenu
                      gameData={game}
                      handleCreateNewGame={handleCreateNewGame}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {totalPages > 1 && totalPages > currentPage && (
            <Box display="flex" justifyContent="center" p={3}>
              <Button type="button" variant="outlined" onClick={loadMoreGames}>
                Load more
              </Button>
            </Box>
          )}
        </>
      ) : isLoading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <Typography variant="h2">No games found</Typography>
      )}
    </Grid>
  );
}

export default GameBox;
