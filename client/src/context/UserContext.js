import React, { createContext, useState } from 'react';
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    error: null,
  });

  const authReset = (err) => {
    localStorage.removeItem('token');
    setLoading(false);
    setState({
      ...state,
      token: null,
      isAuthenticated: false,
      user: null,
      error: err,
    });
  };

  const fetchUserToken = async (userData, newUser) => {
    const fetchLink = newUser ? '/api/user/register' : '/api/user/login';

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setLoading(true);
      const res = await axios.post(fetchLink, userData, config);
      localStorage.setItem('token', res.data.token);
      setLoading(false);
      setState({
        ...state,
        token: res.data.token,
        isAuthenticated: true,
        error: null,
      });
      loadUser();
    } catch (err) {
      authReset(err.response.data.msg);
    }
  };

  //Create a new user
  const register = async (userData) => {
    fetchUserToken(userData, true);
  };

  //Login user
  const login = async (userData) => {
    fetchUserToken(userData, false);
  };

  //Logout user
  const logout = () => {
    authReset(null);
  };

  //Gets the user corresponding to the current user.
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      setLoading(true);
      const res = await axios.get('/api/user');
      setLoading(false);
      setState({
        ...state,
        isAuthenticated: true,
        user: res.data,
      });
    } catch (err) {
      authReset(err.response.data.msg);
    }
  };

  //Clear errors
  const clearErrors = () => {
    setState({
      ...state,
      error: null,
    });
  };

  if (!initialized) {
    //We couldn't load the user here as the context is not available outside the context provider.
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
    setInitialized(true);
  }

  const services = {
    ...state,
    initialized,
    loading,
    register,
    login,
    logout,
    loadUser,
    clearErrors,
  };

  return (
    <UserContext.Provider value={services}>
      {props.children}
    </UserContext.Provider>
  );
};
