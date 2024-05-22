import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  useTheme,
  Grid,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CreateGameFinish = ({ gameData, handleFinish }) => {
  const theme = useTheme();
  const finishGameCreation = () => {
    handleFinish();
  };
  return (
    <Grid
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
      container
      spacing={2}
    >
      <Box
        bgcolor={theme.palette.grey[100]}
        padding={3}
        borderRadius={5}
        display={"flex"}
        flexDirection={"column"}
        sx={{
          width: "100%",
          minWidth: "200px",
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

        <Box mb={3}>
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
            <Typography variant="body1">{gameData.gameID}</Typography>
            <Button startIcon={<ContentCopyIcon />} sx={{ marginLeft: "auto" }}>
              Copy
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: "grey", borderWidth: 1.3 }} mb={3} />

        {gameData.categories.map((category, index) => (
          <Typography key={index} variant="body1" mb={1}>
            {/* Render the name of each category */}
          </Typography>
        ))}
        {/* Attach the testFunction to the onClick event of the button */}
      </Box>

      <Box display="flex" justifyContent="center" p={3}>
        <Button variant="contained" mt={3} onClick={() => finishGameCreation()}>
          Done
        </Button>
      </Box>
    </Grid>
  );
};
export default CreateGameFinish;
