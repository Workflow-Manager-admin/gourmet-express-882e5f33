import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, position: 'relative' }}>
      <CardMedia
        component="img"
        sx={{ width: 140 }}
        image={item.image}
        alt={item.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item.restaurant}
          </Typography>
          <Typography variant="h6" color="primary">
            ₹{(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => handleQuantityChange(-1)}
            sx={{ backgroundColor: 'action.selected' }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          
          <Typography>
            {item.quantity}
          </Typography>
          
          <IconButton 
            size="small" 
            onClick={() => handleQuantityChange(1)}
            sx={{ backgroundColor: 'action.selected' }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          
          <IconButton 
            color="error" 
            onClick={() => removeItem(item.id)}
            sx={{ ml: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;
