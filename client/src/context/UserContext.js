import React, { createContext, useState } from 'react';
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [state, setState] = useState({
    token: localStorage.getItem('token'),
    user: null,
    error: null,

    isAuthenticated: false,
    isLoading: false,
  });

  //Helper: Wipes the
  const authReset = (err) => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setState({
      ...state,
      token: null,
      user: null,
      error: err,

      isAuthenticated: false,
      isLoading: false,
    });
  };

  //Helper: Registers or logins the user and stores user token in state
  const fetchUserToken = async (userData, newUser) => {
    const fetchLink = newUser ? '/api/user/register' : '/api/user/login';

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setState({ ...state, isLoading: true });
      const res = await axios.post(fetchLink, userData, config);
      localStorage.setItem('token', res.data.token);
      setState({
        ...state,
        token: res.data.token,
        error: null,
        isAuthenticated: true,
        isLoading: false,
      });
      loadUser();
    } catch (err) {
      authReset(err.response.msg);
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

  // Gets the user corresponding to the current user.
  const loadUser = async () => {
    try {
      setAuthToken(localStorage.token);
      setState({ ...state, isLoading: true });
      const res = await axios.get('/api/user');
      setState({
        ...state,
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      authReset(null);
    }
  };

  //Logout user
  const logout = () => {
    authReset(null);
  };

  //Clear errors
  const clearErrors = () => {
    setState({
      ...state,
      error: null,
    });
  };

  const services = {
    ...state,
    register,
    login,
    loadUser,
    logout,
    clearErrors,
  };

  return (
    <UserContext.Provider value={services}>
      {props.children}
    </UserContext.Provider>
  );
};
