import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import theme from './theme';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import InstructionsPage from './components/InstructionsPage';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;