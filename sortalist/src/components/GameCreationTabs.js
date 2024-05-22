import React from 'react';
import { Tab, Tabs } from '@mui/material';

const GameCreationTabs = ({ currentStep }) => {
  return (
    <Tabs value={currentStep} aria-label="game creation steps">
      <Tab label="Step 1: Name" />
      <Tab label="Step 2: Categories" disabled={currentStep < 2} />
      <Tab label="Step 3: Words" disabled={currentStep < 3} />
      <Tab label="Step 4: Success" disabled={currentStep < 4} />

      {/* Add more tabs for additional steps */}
    </Tabs>
  );
};

export default GameCreationTabs;
