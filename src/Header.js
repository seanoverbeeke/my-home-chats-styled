import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';  // Import the HomeIcon
import MenuIcon from '@mui/icons-material/Menu';  // Import the hamburger icon

function Header() {
  const [anchorEl, setAnchorEl] = useState(null); // State to control the menu opening
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu when the hamburger icon is clicked
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white', // Keep this color for the AppBar background
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
        {/* Home Icon with color #F43F5E */}
        <HomeIcon sx={{ color: '#F43F5E' }} /> 

        <Typography variant="h6" sx={{ flexGrow: 1, color: '#F43F5E' }}>
          MyHomeChats
        </Typography>

        {/* Hamburger Menu Icon with color #F43F5E */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen} // Open the menu when clicked
        >
          <MenuIcon sx={{ color: '#F43F5E' }} />
        </IconButton>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)} // Check if menu is open
          onClose={handleMenuClose} // Close the menu when clicked outside
        >
          <MenuItem onClick={handleMenuClose}>Login</MenuItem> {/* Login option */}
          <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem> {/* Sign Up option */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
