import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip
} from '@mui/material';
import { AccessTime, LocalOffer } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    cuisine,
    rating,
    deliveryTime,
    priceRange,
    image,
    discount
  } = restaurant;

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
        {!imageError ? (
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
            image={image}
            alt={name}
            onError={handleImageError}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'grey.200',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography color="text.secondary">
              {name}
            </Typography>
          </Box>
        )}
        {discount && (
          <Chip
            label={`${discount}% OFF`}
            color="primary"
            icon={<LocalOffer />}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'primary.main'
            }}
          />
        )}
      </Box>
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {cuisine}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({rating})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTime fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {deliveryTime} mins
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {priceRange}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
