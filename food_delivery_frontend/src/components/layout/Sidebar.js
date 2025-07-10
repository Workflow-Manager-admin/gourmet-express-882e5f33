import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Restaurant,
  LocalDining,
  History,
  Star,
  Notifications,
  Settings
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Restaurants', icon: <Restaurant />, path: '/' },
  { text: 'My Orders', icon: <LocalDining />, path: '/orders' },
  { text: 'Order History', icon: <History />, path: '/history' },
  { text: 'Reviews', icon: <Star />, path: '/reviews' },
  { text: 'Notifications', icon: <Notifications />, path: '/notifications' },
  { text: 'Settings', icon: <Settings />, path: '/settings' }
];

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={onClose}
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            top: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
