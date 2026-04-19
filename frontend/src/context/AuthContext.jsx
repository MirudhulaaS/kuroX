import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // For this MVP, we consider the presence of a 'token' and 'username' as logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const resp = await api.post('login/', { username, password });
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('username', username);
      setUser({ username });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const resp = await api.post('register/', userData);
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('username', userData.username);
      setUser({ username: userData.username });
      return true;
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
         return err.response.data; // return validation errors
      }
      return { error: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
