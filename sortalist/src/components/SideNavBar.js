import React, { useState } from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom'; // If you're using React Router
import Divider from '@mui/material/Divider';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 240;

function SideNavBar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="left"
            open={isOpen}
        >
            <img src="/sortalist-logo.png" alt="SortaList Logo" style={{ width: '100%', height: 64, marginBottom: 2 }} />
            <List>
                <ListItem  component={Link} to="/dashboard" onClick={toggleDrawer}>
                    <DashboardIcon />
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem  component={Link} to="/new-game" onClick={toggleDrawer}>
                    <AddCircleIcon />
                    <ListItemText primary="New Game" />
                </ListItem>
                <ListItem  component={Link} to="/settings" onClick={toggleDrawer}>
                    <SettingsIcon />
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default SideNavBar;
