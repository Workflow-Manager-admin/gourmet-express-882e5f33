import React from 'react';
import { Box, Container, Typography, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import RestaurantList from './RestaurantList';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: 'primary.main'
          }}
        >
          Delicious food,
          <br />
          delivered to you
        </Typography>
        <TextField
          fullWidth
          placeholder="Search for restaurants or cuisines..."
          variant="outlined"
          sx={{
            maxWidth: 600,
            backgroundColor: 'background.paper',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <RestaurantList />
    </Container>
  );
};

export default HomePage;
