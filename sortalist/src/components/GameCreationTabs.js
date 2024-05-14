import React from 'react';
import { Tab, Tabs } from '@mui/material';

const GameCreationTabs = ({ currentStep }) => {
  return (
    <Tabs value={currentStep} aria-label="game creation steps">
      <Tab label="Step 1" />
      <Tab label="Step 2" disabled={currentStep < 2} />
      <Tab label="Step 3" disabled={currentStep < 3} />
      {/* Add more tabs for additional steps */}
    </Tabs>
  );
};

export default GameCreationTabs;
