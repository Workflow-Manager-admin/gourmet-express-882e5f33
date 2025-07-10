import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Rating,
  Chip,
  Tabs,
  Tab,
  Divider,
  Button
} from '@mui/material';
import {
  AccessTime,
  LocalOffer,
  Info,
  RestaurantMenu,
  Reviews,
  Photo
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import MenuList from './MenuList';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  // This would normally come from an API
  const restaurant = {
    id,
    name: "Mario's Italian",
    cuisine: "Italian",
    rating: 4.5,
    totalRatings: 2456,
    deliveryTime: 30,
    priceRange: "₹₹₹",
    image: "https://source.unsplash.com/featured/?italian,restaurant",
    description: "Authentic Italian cuisine in a warm, inviting atmosphere. Featuring hand-made pasta and wood-fired pizzas.",
    address: "123 Food Street, Foodville",
    openingHours: "11:00 AM - 11:00 PM",
    offers: [
      "20% off on orders above ₹500",
      "Free delivery on orders above ₹1000"
    ]
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: 300,
          bgcolor: 'grey.900',
          backgroundImage: `url(${restaurant.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)'
          }
        }}
      >
        <Container
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
            color: 'white',
            pb: 3
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {restaurant.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {restaurant.cuisine}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Rating value={restaurant.rating} precision={0.5} readOnly />
            <Typography>
              {restaurant.rating} ({restaurant.totalRatings} ratings)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip
              icon={<AccessTime />}
              label={`${restaurant.deliveryTime} mins`}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
            <Chip
              label={restaurant.priceRange}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
          </Box>
        </Container>
      </Box>

      <Container sx={{ mt: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab icon={<RestaurantMenu />} label="Menu" />
          <Tab icon={<Info />} label="About" />
          <Tab icon={<Reviews />} label="Reviews" />
          <Tab icon={<Photo />} label="Photos" />
        </Tabs>

        <Box role="tabpanel" hidden={activeTab !== 0}>
          {activeTab === 0 && <MenuList restaurantId={id} />}
        </Box>

        <Box role="tabpanel" hidden={activeTab !== 1}>
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                About {restaurant.name}
              </Typography>
              <Typography paragraph>
                {restaurant.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Location & Hours
              </Typography>
              <Typography paragraph>
                {restaurant.address}
              </Typography>
              <Typography paragraph>
                Open: {restaurant.openingHours}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Offers
              </Typography>
              {restaurant.offers.map((offer, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1
                  }}
                >
                  <LocalOffer color="primary" />
                  <Typography>{offer}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default RestaurantDetails;
