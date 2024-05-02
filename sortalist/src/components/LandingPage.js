import React from 'react';
import { Button, Box, useMediaQuery, useTheme, Typography } from '@mui/material';

function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column-reverse' : 'row'}
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={isMobile ? 5 : 2}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/background_lp.png'})`,
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }}
    >
      <Box>
        <div>
            <Typography variant="h2" component="h1">
              Where Words Meet <strong>Play</strong>
            </Typography>
            <Typography variant="body1">
              Collaborate with your audience & make your presentations
              more interactive!
            </Typography>
            <Box mt={2} display="flex" gap={2}>
                <Button variant="contained" color="primary">Get Started</Button>
                <Button variant="outlined" color="primary">Sign in with Google</Button>
            </Box>
        </div>
      </Box>
      <Box mt={-17}>
        <img src="/images/landing_image.png" alt="Landing" style={{ width: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
}

export default LandingPage;