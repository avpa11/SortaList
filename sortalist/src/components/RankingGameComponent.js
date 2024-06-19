import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Typography, Box } from "@mui/material";

const RankingGameComponent = ({ game }) => {
  const [rankedItems, setRankedItems] = useState(game.rankedWords);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(rankedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRankedItems(items);
  };

  //   const handleSubmit = () => {
  //     console.log('User ranking:', rankedItems);
  //   };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rankingList">
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                padding: 2,
                minHeight: 550,
                maxHeight: 550,
                overflowY: "auto",
              }}
            >
              {rankedItems.map((item, index) => (
                
                <Box display="flex" alignItems="center"                
                sx={{
                    borderRadius: 2,
                    padding: 1,
                    marginBottom: 1,
                    minHeight: "100px",
                  }}>
                  <Typography variant="h4" sx={{ marginRight: 2 }}>
                    {index + 1}.
                  </Typography>
                  <Draggable key={`${item}-${index}`} draggableId={`${item}-${index}`} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          userSelect: "none",
                          padding: 2,
                          borderRadius: 2,
                          margin: "0 0 10px 0",
                          minHeight: "50px",
                          backgroundColor: "primary.main",
                          color: "white",
                          fontSize: "2.2rem", 
                          alignItems: 'center',
                          flexGrow: 1,
                        }}
                      >
                        {item}
                      </Box>
                    )}
                  </Draggable>
                </Box>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default RankingGameComponent;
