import React, { createContext, useState, useReducer } from 'react';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const ContactContext = createContext();

export const ContactContextProvider = (props) => {
  // const [state, setState] = useState({
  //   contacts: [],
  //   filteredContacts: null,
  //   selectedContact: null,
  //   error: null,
  //   isLoading: false,
  // });

  const initialState = {
    contacts: [],
    filteredContacts: null,
    selectedContact: null,
    error: null,
    isLoading: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //Load current user's contacts
  const loadContacts = async () => {
    try {
      // setState({ ...state, isLoading: true });
      const res = await axios.get('/api/contacts');
      // setState({ ...state, isLoading: false, contacts: res.data });
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      // setState({
      //   ...state,
      //   isLoading: false,
      //   contacts: [],
      //   error: err.response.msg,
      // });
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Add Contact
  const addContact = async (contact) => {
    try {
      // setState({ ...state, isLoading: true });
      const res = await axios.post('/api/contacts', contact, config);
      // setState({
      //   ...state,
      //   isLoading: false,
      //   contacts: [res.data, ...state.contacts],
      // });
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      // setState({ ...state, isLoading: false, error: err.response.msg });
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Update Contact
  const updateContact = async (contact) => {
    try {
      console.log('State Before: ' + JSON.stringify(state));
      // setState({ ...state, isLoading: true });
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      console.log('State After: ' + JSON.stringify(state));
      // setState({
      //   ...state,
      //   isLoading: false,
      //   contacts: state.contacts.map((ct) =>
      //     ct._id === res.data._id ? res.data : ct
      //   ),
      // });
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      // setState({ ...state, isLoading: false, error: err.response.msg });
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Delete Contact
  const deleteContact = async (id) => {
    try {
      // setState({ ...state, isLoading: true });
      await axios.delete(`/api/contacts/${id}`);
      // setState({
      //   ...state,
      //   isLoading: false,
      //   contacts: state.contacts.filter((ct) => ct._id !== id),
      // });
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      // setState({ ...state, isLoading: false, error: err.response.msg });
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Set Current Contact
  const setSelectedContact = (contact) => {
    // setState({ ...state, selectedContact: contact });
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear Current Contact
  const clearSelectedContact = () => {
    // setState({ ...state, selectedContact: null });
    dispatch({ type: CLEAR_CURRENT });
  };

  //Filter Contacts
  const setFilter = (text) => {
    // const regex = new RegExp(text, 'gi');
    // setState({
    //   ...state,
    //   filteredContacts: state.contacts.filter((ct) => {
    //     return ct.name.match(regex) || ct.email.match(regex);
    //   }),
    // });
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    // setState({ ...state, filteredContacts: null });
    dispatch({ type: CLEAR_FILTER });
  };

  const services = {
    ...state,
    loadContacts,
    addContact,
    deleteContact,
    setSelectedContact,
    clearSelectedContact,
    updateContact,
    setFilter,
    clearFilter,
  };

  return (
    <ContactContext.Provider value={services}>
      {props.children}
    </ContactContext.Provider>
  );
};

export const GET_CONTACTS = 'GET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const SET_CURRENT = 'SET_CURRENT';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const FILTER_CONTACTS = 'FILTER_CONTACTS';
export const CLEAR_CONTACTS = 'CLEAR_CONTACTS';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const CONTACT_ERROR = 'CONTACT_ERROR';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        isLoading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        isLoading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        isLoading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
        isLoading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filteredContacts: null,
        selectedContact: null,
        error: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        selectedContact: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        selectedContact: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filteredContacts: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredContacts: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// let testCotnacts = [
//   {
//     _id: 1,
//     name: 'Jill Johnson',
//     email: 'jill@gmail.com',
//     phone: '111-111-1111',
//     type: 'personal',
//   },
//   {
//     _id: 2,
//     name: 'Sara Watson',
//     email: 'sara@gmail.com',
//     phone: '111-111-1112',
//     type: 'personal',
//   },
//   {
//     _id: 3,
//     name: 'Harry White',
//     email: 'harry@gmail.com',
//     phone: '111-111-1113',
//     type: 'professional',
//   },
// ];
