import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Button, Box, InputBase } from '@mui/material';
import { ShoppingCart, PersonOutline, Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { md: 'none' } }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Box 
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
          onClick={() => navigate('/')}
        >
          <Logo />
        </Box>

        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <InputBase
            placeholder="Search restaurants or dishes..."
            sx={{
              width: '100%',
              maxWidth: 600,
              bgcolor: 'background.paper',
              borderRadius: 1,
              p: 1,
              pl: 2,
              '&:hover': { bgcolor: 'background.default' }
            }}
            startAdornment={<SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={4} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <Button
            color="inherit"
            startIcon={<PersonOutline />}
            onClick={() => navigate('/profile')}
          >
            Account
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
