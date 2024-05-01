import React, {useState} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="./images/logo.png" alt="SortaList Logo" style={{ height: '30px' }}/>                    
          <span> SortaList</span>
        </Typography>
        {/* Create the navigation bar with links to the How it works, About us and Contact pages */}
        <Link href="/how-it-works" color="inherit" underline="none">How it works</Link>
        <Link href="/about-us" color="inherit" underline="none">About us</Link>
        <Link href="/contact" color="inherit" underline="none">Contact</Link>
        {/* Add the Login and Sign Up button to the top right of the navigation bar */}
        <Button color="inherit">Login</Button>
        <Button color="inherit">Sign Up</Button>
      </Toolbar>
    </AppBar>    
  )
}

export default NavBar;