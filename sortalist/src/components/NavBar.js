import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="relative" sx={{ backgroundColor: 'transparent', boxShadow: 'none', boxShadow: 'none', marginBottom: 0 }}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', display: 'flex', alignItems: 'center' }}>
            <img src="./images/logo.png" alt="SortaList Logo" style={{ height: '35px' }}/>                    
            <span font-color='black'>SortaList</span>
            </Typography>
            <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="center" alignItems="center" flexGrow={1}>
                {/* Create the navigation bar with links to the How it works, About us and Contact pages */}
                <Typography variant="body1" color="text.primary">
                    <Box mr={2}>
                        <Link to="/how-it-works" color="inherit" underline="none">How it works</Link>
                    </Box>
                </Typography>
                <Typography variant="body1" color="text.primary">
                    <Box mr={2}>
                        <Link to="/about-us" color="inherit" underline="none">About us</Link>
                    </Box>
                </Typography>
                <Typography variant="body1" color="text.primary">
                    <Box mr={2}>
                        <Link to="/contact" color="inherit" underline="none">Contact</Link>
                    </Box>
                </Typography>
            </Box>
            {/* Add the Login and Sign Up button to the top right of the navigation bar */}
            <Box>
                <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Login</Button>
                <Button variant="contained" color="primary">Sign Up</Button>
            </Box>
        </Toolbar>
        </AppBar>    
  )
}

export default NavBar;