import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import theme from './theme';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <LandingPage></LandingPage>
      </Router>
    </ThemeProvider>
  );
}

export default App;