import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Card,
  CardMedia,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';

// This would normally come from an API
const menuCategories = [
  {
    id: 1,
    name: "Starters",
    items: [
      {
        id: 101,
        name: "Bruschetta",
        description: "Grilled bread rubbed with garlic and topped with tomatoes, olive oil, salt and pepper",
        price: 299,
        image: "https://source.unsplash.com/featured/?bruschetta",
        isVeg: true,
        spicyLevel: "mild"
      },
      {
        id: 102,
        name: "Calamari Fritti",
        description: "Crispy fried squid rings served with marinara sauce",
        price: 399,
        image: "https://source.unsplash.com/featured/?calamari",
        isVeg: false,
        spicyLevel: "medium"
      }
    ]
  },
  {
    id: 2,
    name: "Main Course",
    items: [
      {
        id: 201,
        name: "Margherita Pizza",
        description: "Classic tomato sauce, mozzarella, and basil",
        price: 499,
        image: "https://source.unsplash.com/featured/?pizza",
        isVeg: true,
        spicyLevel: "mild"
      },
      {
        id: 202,
        name: "Pasta Carbonara",
        description: "Spaghetti with eggs, cheese, pancetta, and black pepper",
        price: 449,
        image: "https://source.unsplash.com/featured/?pasta",
        isVeg: false,
        spicyLevel: "mild"
      }
    ]
  }
];

const MenuList = ({ restaurantId }) => {
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleAddToCart = () => {
    if (selectedItem) {
      addItem({
        ...selectedItem,
        quantity,
        specialInstructions,
        restaurantId
      });
      handleCloseDialog();
    }
  };

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setSpecialInstructions('');
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setQuantity(1);
    setSpecialInstructions('');
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Box>
      {menuCategories.map((category) => (
        <Box key={category.id} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {category.name}
          </Typography>
          <List>
            {category.items.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog(item)}
                    >
                      Add
                    </Button>
                  }
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120, borderRadius: 1, mr: 2 }}
                    image={item.image}
                    alt={item.name}
                  />
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.name}
                        <Chip
                          size="small"
                          label={item.isVeg ? "VEG" : "NON-VEG"}
                          color={item.isVeg ? "success" : "error"}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          ₹{item.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Card>
            ))}
          </List>
        </Box>
      ))}

      <Dialog open={!!selectedItem} onClose={handleCloseDialog}>
        {selectedItem && (
          <>
            <DialogTitle>{selectedItem.name}</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Quantity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton onClick={() => handleQuantityChange(-1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton onClick={() => handleQuantityChange(1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Special Instructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests?"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleAddToCart}>
                Add to Cart - ₹{selectedItem.price * quantity}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MenuList;
