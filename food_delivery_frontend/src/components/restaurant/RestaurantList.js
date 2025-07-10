import React from 'react';
import { Grid, Box, Typography, TextField, MenuItem } from '@mui/material';
import RestaurantCard from './RestaurantCard';

const sortOptions = [
  { value: 'rating', label: 'Rating: High to Low' },
  { value: 'deliveryTime', label: 'Delivery Time' },
  { value: 'priceAsc', label: 'Price: Low to High' },
  { value: 'priceDesc', label: 'Price: High to Low' }
];

// Placeholder data - this would normally come from an API
const restaurants = [
  {
    id: 1,
    name: "Mario's Italian",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: 30,
    priceRange: "₹₹₹",
    image: "https://source.unsplash.com/featured/?italian,food",
    discount: 20
  },
  {
    id: 2,
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: 40,
    priceRange: "₹₹₹₹",
    image: "https://source.unsplash.com/featured/?sushi",
    discount: null
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.3,
    deliveryTime: 25,
    priceRange: "₹₹",
    image: "https://source.unsplash.com/featured/?indian,food",
    discount: 15
  },
  // Add more restaurants as needed
];

const RestaurantList = () => {
  const [sortBy, setSortBy] = React.useState('rating');

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurants Near You
        </Typography>
        <TextField
          select
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ width: 200 }}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={3}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RestaurantList;
