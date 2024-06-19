import { useDispatch, useSelector } from "react-redux";
import { getUserGameSession, joinSession } from "../redux/slices/user";
import { forwardRef, useEffect, useState } from "react";
import { auth, gamesCol, gameResultsCol } from "../firebase/firebase";
import { addDoc, doc, getDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Slide,
  Typography,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { WhiteCardBox } from "../components/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import RankingGameComponent from "../components/RankingGameComponent";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const saveAnswersToFirestore = async (user, sessionId, answers) => {
  try {
    const resultRef = doc(gameResultsCol, sessionId);
    await addDoc(resultRef, {
      uid: user.uid,
      answers: answers
    });
    console.log("Answers saved successfully!");
  } catch (error) {
    console.error("Error saving answers: ", error);
  }
};

const GamePage = () => {
  const user = auth.currentUser;
  const userSessionId = useSelector(getUserGameSession);
  const [game, setGame] = useState();
  const [columns, setColumns] = useState({});
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [differences, setDifferences] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      if (userSessionId) {
        const gameRef = doc(gamesCol, userSessionId);
        const docSnap = await getDoc(gameRef);
        if (docSnap.exists()) {
          setGame(docSnap.data());
        } else {
          console.log("The game with the provided session ID does not exist.");
        }
      }
    };

    fetchGame();
  }, [userSessionId]);

  useEffect(() => {
    if (game && game.gameType === "Sorting") {
      const allWords = game.categories.flatMap((category) => category.words);

      const initialColumns = {
        column1: {
          name: "Sort the words",
          items: allWords,
        },
      };

      // Add categories as columns
      game.categories.forEach((category, index) => {
        initialColumns[`column${index + 2}`] = {
          name: category.name,
          items: [],
        };
      });

      setColumns(initialColumns);
    }
  }, [game]);

  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

  const handleLeaveDialogOpen = () => {
    setOpenLeaveDialog(true);
  };

  const handleLeaveDialogClose = () => {
    setOpenLeaveDialog(false);
  };

  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);

  const handleAnswerDialogOpen = async () => { 
    if (game.gameType === "Sorting") {
      const columnsToCompare = Object.values(columns)
      .filter((column) => column.name !== "Sort the words")
      .map((column) => ({
        name: column.name,
        words: column.items.sort(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const normalizedCategories = normalizeStructure(game.categories);

    const differences = findDifferences(columnsToCompare, normalizedCategories);
    setDifferences(differences);

    // Save answers to Firestore
    await saveAnswersToFirestore(user, userSessionId, columnsToCompare);

    setOpenAnswerDialog(true);
    } else{
      setOpenAnswerDialog(true);
    }

  };

  const handleAnswerDialogClose = () => {
    setOpenAnswerDialog(false);
  };

  const leaveSession = () => {
    dispatch(joinSession(null));
    navigate("/guest");
  };

  const normalizeStructure = (structure) => {
    if (structure) {
      return structure
        .map((category) => ({
          name: category.name,
          words: category.words.sort(),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  // Function to find differences
  const findDifferences = (columns, categories) => {
    const differences = [];

    columns.forEach((column, index) => {
      const category = categories.find((cat) => cat.name === column.name);
      if (category) {
        const missingWords = category.words.filter(
          (word) => !column.words.includes(word)
        );
        const extraWords = column.words.filter(
          (word) => !category.words.includes(word)
        );

        if (missingWords.length > 0 || extraWords.length > 0) {
          differences.push({
            column: column.name,
            missingWords,
            extraWords,
          });
        }
      } else {
        differences.push({
          column: column.name,
          missingWords: [],
          extraWords: column.words,
        });
      }
    });

    categories.forEach((category) => {
      if (!columns.find((col) => col.name === category.name)) {
        differences.push({
          column: category.name,
          missingWords: category.words,
          extraWords: [],
        });
      }
    });

    return differences;
  };

  return (
    <Box>
      {game && (
        <>
          <Typography variant="h2" textAlign={"center"}>
            {game.gameTitle}
          </Typography>
          {game.gameType === "Ranking" ? (
            <RankingGameComponent game={game} />
          ) : (
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              <Grid container p={5} spacing={2} justifyContent="center">
                {Object.entries(columns).map(([columnId, column], index) => (
                  <Grid item xs={12} md={6} lg={4} key={columnId}>
                    <WhiteCardBox>
                      <Typography variant="h6" align="center">
                        {column.name}
                      </Typography>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => (
                          <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{
                              border: `2px dashed ${theme.palette.primary.main}`,
                              borderColor: snapshot.isDraggingOver
                                ? "secondary.main"
                                : "transparent",
                              padding: 2,
                              minHeight: 250,
                              maxHeight: 250,
                              overflowY: "auto",
                            }}
                          >
                            {column.items.map((item, index) => (
                              <Draggable
                                key={item}
                                draggableId={item}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{
                                      userSelect: "none",
                                      padding: 2,
                                      borderRadius: 5,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "info.main"
                                        : "primary.main",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item}
                                  </Box>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    </WhiteCardBox>
                  </Grid>
                ))}
              </Grid>
            </DragDropContext>
          )}

          <Box display="flex" justifyContent="center" gap={2} p={5}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLeaveDialogOpen}
            >
              Leave
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAnswerDialogOpen}
            >
              {game.gameType === "Sorting"
                ? "Check my answers"
                : "Submit ranking"}
            </Button>
          </Box>
        </>
      )}

      <Dialog
        open={openLeaveDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLeaveDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you leaving?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to leave the current game session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLeaveDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={() => leaveSession()}>
            Leave
          </Button>
        </DialogActions>
      </Dialog>

      {game && (
  <Dialog
    open={openAnswerDialog}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleAnswerDialogClose}
    aria-describedby="alert-dialog-answers-description"
  >
    <DialogTitle>Your answers</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-answers-description">
        {differences.length > 0 ? (
          <>
            <Typography variant="h6">You are incorrect 😢</Typography>
            <List>
              {differences.map((diff, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Column: ${diff.column}`}
                    secondary={
                      <>
                        {diff.missingWords.length > 0 && (
                          <div>
                            Missing words: {diff.missingWords.join(", ")}
                          </div>
                        )}
                        {diff.extraWords.length > 0 && (
                          <div>
                            Extra words: {diff.extraWords.join(", ")}
                          </div>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography variant="h6">
            {game.gameType === "Ranking"
              ? "Ranking submitted! 🎉🎉🎉"
              : "You are correct! Congratulations! 🎉🎉🎉"}
          </Typography>
        )}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleAnswerDialogClose}>Cancel</Button>
      <Button variant="contained" onClick={() => leaveSession()}>
        Leave the session
      </Button>
    </DialogActions>
  </Dialog>
)}

    </Box>
  );
};

export default GamePage;