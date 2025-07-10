import React from 'react';
import { Typography, Box } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <RestaurantIcon sx={{ color: 'primary.main' }} />
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          letterSpacing: '0.5px'
        }}
      >
        Gourmet Express
      </Typography>
    </Box>
  );
};

export default Logo;
