import React from 'react';
import { Button } from '@mui/material';

function LandingPage() {
  return (
    <div>
      <h1>Where Words Meet <strong>Play</strong></h1>
      <p>Collaborate with your audience & make your presentations more interactive!</p>
      <Button variant="contained" color="primary">Get Started</Button>
      <Button variant="outlined" color="primary">Sign in with Google</Button>
    </div>
  );
}

export default LandingPage;