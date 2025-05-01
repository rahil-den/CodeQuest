
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../service/api.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await api.get('/api/auth/verify');
          setUser(res.data.user);
        } catch (error) {
          console.error('Verification failed:', error);
          localStorage.removeItem('token'); // Token might be invalid
          setUser(null); // Clear user state
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      setErrorMessage('');
      const credentials = { username, password };
      
      const response = await api.post('/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      console.log(response.data.user.role);
      if(response.data.user.role == 'admin') {
        router('/admin/dashboard'); // Redirect to admin dashboard after login
      }
      else{
        router('/'); // Redirect to home page after login
      }
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
      setErrorMessage(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const register = async (userData) => {
    try {
      setErrorMessage('');
      const response = await api.post('/api/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      router('/'); // Redirect to home page after registration
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessage(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    router('/login'); // Redirect to login page after logout
  };

  const updateUser =async (updatedUserData) => {
    const response = await api.put('/api/auth/profile', updatedUserData);
    console.log(response);
    // api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setUser(response.data.user);
    router('/user/dashboard'); // Redirect to dashboard after updating user profile
  };

  const value = {
    user,
    loading,
    errorMessage,
    login,
    register,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext); 