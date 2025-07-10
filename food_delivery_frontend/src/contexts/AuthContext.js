import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement actual API call
      // Simulated API response
      const response = { 
        user: { 
          id: '1', 
          name: 'John Doe', 
          email, 
          avatar: 'https://source.unsplash.com/featured/?person' 
        } 
      };
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement actual API call
      // Simulated API response
      const response = { 
        user: { 
          id: '1', 
          name, 
          email, 
          avatar: 'https://source.unsplash.com/featured/?person' 
        } 
      };
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
