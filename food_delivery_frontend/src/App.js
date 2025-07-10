import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Layout from './components/layout/Layout';
import './styles/globalStyles.css';

import HomePage from './components/restaurant/HomePage';
import CartPage from './components/cart/CartPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import RestaurantDetails from './components/restaurant/RestaurantDetails';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

const Profile = () => <div>Profile Page</div>;
const Orders = () => <div>Orders Page</div>;
const History = () => <div>Order History Page</div>;
const Reviews = () => <div>Reviews Page</div>;
const Notifications = () => <div>Notifications Page</div>;
const Settings = () => <div>Settings Page</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/history" element={<History />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
