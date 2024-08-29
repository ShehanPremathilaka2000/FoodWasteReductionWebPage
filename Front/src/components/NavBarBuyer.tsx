import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/logo.png';
import HomeIcon from '@mui/icons-material/Home';

const settings = ['Profile', 'Logout'];

const NavBarBuyer = () => {
    const handleAddItem = () => {
        navigate('/add-edit-listings', { state: { initialData: { sellerId: user.id }, add: true, user: user } });
    };

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setOpenMenu(event.currentTarget);
    };

    const handleHomeClick = () => {
        navigate('/seller', { state: { userId: user.id } });
    };

    const handleCloseUserMenu = (event: any) => {
        switch (event.target.innerText) {
            case 'Profile':
                navigate('/profile', { state: { user: user } });
                break;
            case 'Logout':
                navigate('/', { replace: true });
                break;
        }
        setOpenMenu(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2196f3' }}>
            <Container maxWidth="100%">
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', position: '0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={handleHomeClick} sx={{ marginRight: '5rem' }}>
                                <HomeIcon />
                            </IconButton>
                            <img src={logo} alt="logo" style={{ width: 150, marginRight: '1rem' }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button variant="contained" onClick={handleAddItem} color="success" sx={{ marginRight: '5rem', borderRadius: '2px' }}>
                                Add Item
                            </Button>
                            <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src={imageURL} />
                            </IconButton>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={openMenu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(openMenu)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBarBuyer;
