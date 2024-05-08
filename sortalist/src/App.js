import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import theme from "./theme";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
