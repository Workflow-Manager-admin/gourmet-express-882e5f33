import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const steps = ['Cart', 'Delivery Address', 'Payment'];

const CartPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const deliveryFee = 40;
  const tax = total * 0.05;
  const grandTotal = total + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Browse Restaurants
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 2 }}>
          <Typography variant="h5" gutterBottom>
            Your Order
          </Typography>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>₹{total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Delivery Fee</Typography>
                <Typography>₹{deliveryFee.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax</Typography>
                <Typography>₹{tax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">₹{grandTotal.toFixed(2)}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              {activeStep > 0 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ flex: 1 }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ flex: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
