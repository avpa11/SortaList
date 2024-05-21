import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CreateGameFinish = ({ gameData }) => {
  const finish = () => {
    console.log("Nice");
    console.log(gameData);
    console.log(gameData.gameID);
    console.log(gameData.categories);
    console.log("gameData.categories");
  };

  return (
    <Box>
      <Box
        bgcolor="#F5F6FA"
        p={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Success!
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)" }}
          gutterBottom
          mb={5}
        >
          Your game session has been created.
        </Typography>

        <Box  mb={3}>
          <Typography
            style={{ color: "#1F64FF", fontWeight: "bold" }}
            variant="body1"
            mb={1}
          >
            Session ID
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: 2, // Add padding
              alignItems: "center", // Align items vertically
            }}
            bgcolor="white"
          >
            <Typography variant="body1">{gameData.uniqueID}</Typography>
            <Button startIcon={<ContentCopyIcon />} sx={{ marginLeft: "auto" }}>
              Copy
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: "grey", borderWidth: 1.3 }} mb={3} />


        <Box  mb={5}>
          <Typography
            style={{ color: "#1F64FF", fontWeight: "bold" }}
            variant="body1"
            mb={1}
          >
            Session Link
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: 2, // Add padding
              alignItems: "center", // Align items vertically
            }}
            bgcolor="white"
          >
            <Typography variant="body1">
              https://sortalist.web.app/session/{gameData.uniqueID}
            </Typography>
            <Button startIcon={<ContentCopyIcon />} sx={{ marginLeft: "auto" }}>
              Copy
            </Button>
          </Box>
        </Box>

        {gameData.categories.map((category, index) => (
          <Typography key={index} variant="body1" mb={1}>
            {/* Render the name of each category */}
          </Typography>
        ))}
        {/* Attach the testFunction to the onClick event of the button */}

      </Box>

      <Button variant="contained" onClick={finish} mt={3}>
          Done
        </Button>
    </Box>
  );
};
export default CreateGameFinish;
