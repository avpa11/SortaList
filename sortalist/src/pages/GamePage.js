import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Refresh, ArrowBack, ArrowForward } from "@mui/icons-material";

const initialTaskStatus = {
  scattered: [
    { id: "1", word: "Bananas", desc: "Bananas are high in potassium", position: { top: "10%", left: "30%" } },
    { id: "2", word: "Oranges", desc: "Oranges are good for vitamin C", position: { top: "10%", left: "20%" } },
    { id: "3", word: "Potatoes", desc: "Potatoes are good carbs", position: { top: "20%", left: "25%" } },
    { id: "4", word: "Eggplant", desc: "Eggplant is underrated", position: { top: "20%", left: "30%" } },
    { id: "5", word: "Tomatoes", desc: "Tomatoes come in all shapes and sizes", position: { top: "30%", left: "25%" } },
    { id: "6", word: "Apples", desc: "Keeps the doctor away", position: { top: "30%", left: "15%" } },
    { id: "7", word: "Blueberries", desc: "Blueberries are not blackberries", position: { top: "40%", left: "30%" } },
  ],
  fruits: [],
  veggies: [],
};

const Card = ({ id, text, index, moveCard, position, desc, handleSwipeLeft, handleSwipeRight }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      onClick={handleFlip}
      style={{
        width: "100px",
        height: "150px",
        margin: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: flipped ? "royalBlue" : "Blue",
        color: "white",
        fontFamily: "Comic Sans MS, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: `rotate(${Math.random() * 30 - 15}deg)`,
        transition: "top 0.5s, left 0.5s, transform 0.5s, background-color 0.5s",
      }}
    >
      <div style={{ transform: `rotate(${Math.random() * 10 - 5}deg)` }}>
        {flipped ? desc : text}
      </div>
    </div>
  );
};

const GamePage = () => {
  const [columns, setColumns] = useState(initialTaskStatus);

  const moveCard = (fromIndex, fromArray, toArray, toLeft, toTop) => {
    const movedItem = columns[fromArray][fromIndex];

    // Remove the item from the original array
    const updatedFromArray = columns[fromArray].filter((_, idx) => idx !== fromIndex);

    // Add the item to the target array with updated position
    const updatedToArray = [
      ...columns[toArray],
      { ...movedItem, position: { top: `${toTop}%`, left: `${toLeft}%` } },
    ];

    setColumns({
      ...columns,
      [fromArray]: updatedFromArray,
      [toArray]: updatedToArray,
    });
  };

  const handleSwipeLeft = (index, position) => {
    moveCard(index, "scattered", "fruits", 10, 10);
  };

  const handleSwipeRight = (index, position) => {
    moveCard(index, "scattered", "veggies", 10, 10);
  };

  const resetPosition = () => {
    setColumns(initialTaskStatus);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", height: "50vh", position: "relative", padding: "20px" }}>
      <div
        id="left-container"
        style={{
          width: "30%",
          height: "30%",
          margin: "10px",
          padding: "150px",
          backgroundColor: "lightblue",
          border: "1px solid #ccc",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {columns.fruits.map((item, index) => (
          <Card
            key={item.id}
            id={item.id}
            text={item.word}
            index={index}
            moveCard={moveCard}
            position={item.position}
            desc={item.desc}
            handleSwipeLeft={() => handleSwipeLeft(index, item.position)}
            handleSwipeRight={() => handleSwipeRight(index, item.position)}
          />
        ))}
        <p style={{
            margin: 0,
            fontFamily: "sans-serif",
            color: "white",
            fontWeight: "bolder",
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}>FRUITS</p>
      </div>
      <div
        style={{
          width: "30%",
          height: "30%",
          margin: "10px",
          padding: "150px",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Middle Container */}
        {columns.scattered.map((item, index) => (
          <Card
            key={item.id}
            id={item.id}
            text={item.word}
            index={index}
            moveCard={moveCard}
            position={item.position}
            desc={item.desc}
            handleSwipeLeft={() => handleSwipeLeft(index, item.position)}
            handleSwipeRight={() => handleSwipeRight(index, item.position)}
          />
        ))}
        <div
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={() => columns.scattered.forEach((item, index) => handleSwipeLeft(index, item.position))}
            color="primary"
            aria-label="swipe left"
            style={{ width: "50%", padding: 10, margin: "auto" }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={() => columns.scattered.forEach((item, index) => handleSwipeRight(index, item.position))}
            color="primary"
            aria-label="swipe right"
            style={{ width: "50%", padding: 10, margin: "auto" }}
          >
            <ArrowForward />
          </IconButton>
          <IconButton
            onClick={resetPosition}
            color="primary"
            aria-label="reset"
            style={{ width: "50%", padding: 10, margin: "auto" }}
          >
            <Refresh />
          </IconButton>
        </div>
      </div>
      <div
        id="right-container"
        style={{
          width: "30%",
          height: "30%",
          margin: "10px",
          padding: "150px",
          backgroundColor: "lightgreen",
          border: "1px solid #ccc",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {columns.veggies.map((item, index) => (
          <Card
            key={item.id}
            id={item.id}
            text={item.word}
            index={index}
            moveCard={moveCard}
            position={item.position}
            desc={item.desc}
            handleSwipeLeft={() => handleSwipeLeft(index, item.position)}
            handleSwipeRight={() => handleSwipeRight(index, item.position)}
          />
        ))}
        <p style={{
            margin: 0,
            fontFamily: "sans-serif",
            color: "white",
            fontWeight: "bolder",
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}>VEGGIES</p>
      </div>
      <div
        style={{
          width: "15%",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "100%", padding: 10, margin: "auto" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default GamePage;
