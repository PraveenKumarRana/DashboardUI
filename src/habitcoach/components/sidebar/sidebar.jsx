import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    Tooltip,
    Box,
    Toolbar,
    Avatar,
    Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PersonIcon from '@mui/icons-material/Person';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 80;

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Habits', icon: <TrackChangesIcon />, path: '/habits' },
        { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    py: 2,
                },
            }}
        >
            {/* Brand Icon */}
            <a href="https://buildloop.ai" target="_blank" rel="noopener noreferrer">
                <Avatar
                    sx={{
                        bgcolor: '#8e44ad',
                        width: 40,
                        height: 40,
                        mb: 3,
                        cursor: 'pointer',
                    }}
                >
                    <AllInclusiveIcon />
                </Avatar>
            </a>

            {/* Navigation Icons */}
            <Box sx={{ flexGrow: 1 }}>
                <List>
                    {navItems.map((item) => (
                        <Tooltip title={item.text} placement="right" arrow key={item.text}>
                            <ListItem
                                button
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                sx={{
                                    justifyContent: 'center',
                                    '&.Mui-selected': {
                                        backgroundColor: '#333',
                                        '&:hover': {
                                            backgroundColor: '#444',
                                        },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#2a2a2a',
                                    },
                                    mb: 1,
                                }}
                            >
                                <ListItemIcon sx={{ color: '#fff', minWidth: 0 }}>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;