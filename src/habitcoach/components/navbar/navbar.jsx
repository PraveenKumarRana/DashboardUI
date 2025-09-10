// src/components/Navbar.jsx
import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, Button, Avatar, Box, IconButton, Menu, MenuItem} from '@mui/material';
import {useNavigate, Link} from 'react-router-dom';
import {getUserFromToken, clearAuth} from '../../../utils/user_utils.jsx';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = getUserFromToken();
        setUser(userData);
    }, []);

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="sticky"
            color="white"
            elevation={1}
            sx={{
                backgroundColor: "#1e1e1e",
                color: "white",
                boxShadow: 1,
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                {/* Left Side: Brand */}
                <Typography variant="h6" component={Link} to="/" sx={{textDecoration: 'none', color: 'inherit'}}>
                    Mr. Coach
                </Typography>

                {/* Right Side: Conditional */}
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    {user ? (
                        <>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar
                                    alt={user.name}
                                    src={user.picture}
                                    sx={{width: 38, height: 38, border: "2px solid white"}}
                                    slotProps={{
                                        img: {
                                            referrerPolicy: "no-referrer"
                                        }
                                    }}
                                />
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem disabled>{user.name || user.email}</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;