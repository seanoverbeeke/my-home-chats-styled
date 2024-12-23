// src/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        borderRadius: 0,
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          borderRadius: 0,
          padding: '0 16px',
        }}
      >
        {/* Home Icon wrapped with Link to navigate back to the homepage */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <HomeIcon sx={{ color: '#F43F5E' }} />
          </IconButton>
        </Link>

        <Typography variant="h6" sx={{ flexGrow: 1, color: '#F43F5E' }}>
          MyHomeChats
        </Typography>

        {/* Hamburger Menu Icon with color #F43F5E */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon sx={{ color: '#F43F5E' }} />
        </IconButton>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>Login</MenuItem>
          <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>Sign Up</MenuItem>
          <MenuItem component={Link} to="/billing" onClick={handleMenuClose}>Billing</MenuItem>
          <MenuItem component={Link} to="/privacy" onClick={handleMenuClose}>Privacy</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
