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
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f",
        isVeg: true,
        spicyLevel: "mild"
      },
      {
        id: 102,
        name: "Calamari Fritti",
        description: "Crispy fried squid rings served with marinara sauce",
        price: 399,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
        isVeg: false,
        spicyLevel: "medium"
      },
      {
        id: 103,
        name: "Garlic Bread",
        description: "Fresh baked bread with garlic butter and herbs",
        price: 199,
        image: "https://images.unsplash.com/photo-1619535860434-da835a593eb2",
        isVeg: true,
        spicyLevel: "mild"
      }
    ]
  },
  {
    id: 2,
    name: "Pizza",
    items: [
      {
        id: 201,
        name: "Margherita Pizza",
        description: "Classic tomato sauce, mozzarella, and fresh basil",
        price: 499,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
        isVeg: true,
        spicyLevel: "mild"
      },
      {
        id: 202,
        name: "Pepperoni Pizza",
        description: "Tomato sauce, mozzarella, and spicy pepperoni",
        price: 599,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
        isVeg: false,
        spicyLevel: "medium"
      },
      {
        id: 203,
        name: "Vegetarian Supreme",
        description: "Loaded with bell peppers, mushrooms, onions, and olives",
        price: 549,
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212",
        isVeg: true,
        spicyLevel: "mild"
      }
    ]
  },
  {
    id: 3,
    name: "Pasta",
    items: [
      {
        id: 301,
        name: "Pasta Carbonara",
        description: "Spaghetti with eggs, cheese, pancetta, and black pepper",
        price: 449,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
        isVeg: false,
        spicyLevel: "mild"
      },
      {
        id: 302,
        name: "Penne Arrabbiata",
        description: "Spicy tomato sauce with garlic and red chili",
        price: 399,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
        isVeg: true,
        spicyLevel: "hot"
      },
      {
        id: 303,
        name: "Fettuccine Alfredo",
        description: "Creamy parmesan sauce with butter and black pepper",
        price: 479,
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
        isVeg: true,
        spicyLevel: "mild"
      }
    ]
  },
  {
    id: 4,
    name: "Main Course",
    items: [
      {
        id: 401,
        name: "Grilled Salmon",
        description: "Fresh salmon fillet with lemon herb butter",
        price: 699,
        image: "https://images.unsplash.com/photo-1567529684892-09290a1b2d05",
        isVeg: false,
        spicyLevel: "mild"
      },
      {
        id: 402,
        name: "Chicken Marsala",
        description: "Pan-seared chicken with mushroom marsala sauce",
        price: 599,
        image: "https://images.unsplash.com/photo-1594221708779-94832f4320d1",
        isVeg: false,
        spicyLevel: "medium"
      }
    ]
  },
  {
    id: 5,
    name: "Salads",
    items: [
      {
        id: 501,
        name: "Caesar Salad",
        description: "Romaine lettuce, croutons, parmesan, and caesar dressing",
        price: 349,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
        isVeg: true,
        spicyLevel: "mild"
      },
      {
        id: 502,
        name: "Mediterranean Salad",
        description: "Mixed greens, feta, olives, and balsamic dressing",
        price: 399,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
        isVeg: true,
        spicyLevel: "mild"
      }
    ]
  },
  {
    id: 6,
    name: "Desserts",
    items: [
      {
        id: 601,
        name: "Tiramisu",
        description: "Classic Italian coffee-flavored dessert",
        price: 349,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
        isVeg: true,
        spicyLevel: "mild"
      },
      {
        id: 602,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center",
        price: 299,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51",
        isVeg: true,
        spicyLevel: "mild"
      }
    ]
  },
  {
    id: 7,
    name: "Beverages",
    items: [
      {
        id: 701,
        name: "Italian Soda",
        description: "Sparkling water with your choice of flavored syrup",
        price: 179,
        image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22",
        isVeg: true,
        spicyLevel: "mild"
      },
      {
        id: 702,
        name: "Espresso",
        description: "Single shot of Italian espresso",
        price: 149,
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04",
        isVeg: true,
        spicyLevel: "mild"
      },
      {
        id: 703,
        name: "Fresh Lemonade",
        description: "House-made lemonade with fresh mint",
        price: 169,
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e83b",
        isVeg: true,
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
              <Card 
                key={item.id} 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <Box sx={{ 
                  position: 'relative',
                  width: { xs: '100%', sm: 120 },
                  height: { xs: 200, sm: 120 }
                }}>
                  <CardMedia
                    component="img"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    image={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://picsum.photos/400/300?food=${encodeURIComponent(item.name)}`;
                      // Second fallback if picsum fails
                      e.target.onerror = () => {
                        e.target.onerror = null;
                        e.target.src = `https://source.unsplash.com/featured/?${encodeURIComponent(item.name.toLowerCase())},food`;
                      };
                    }}
                  />
                </Box>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    flexGrow: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 0 }
                  }}
                  secondaryAction={
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog(item)}
                      sx={{
                        position: { xs: 'relative', sm: 'absolute' },
                        right: { xs: 0, sm: 16 },
                        mt: { xs: 2, sm: 0 }
                      }}
                    >
                      Add
                    </Button>
                  }
                >
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
