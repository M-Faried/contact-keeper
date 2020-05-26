import React, { createContext, useState } from 'react';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const ContactContext = createContext();

export const ContactContextProvider = (props) => {
  const [state, setState] = useState({
    contacts: [],
    selectedContact: null,
    filterText: null,
    filteredContacts: null,
    error: null,
    isLoading: false,
  });

  //Load current user's contacts
  const loadContacts = async () => {
    try {
      setState((ps) => ({ ...ps, isLoading: true }));
      const res = await axios.get('/api/contacts');
      setState((ps) => ({
        ...ps,
        isLoading: false,
        contacts: res.data,
      }));
    } catch (err) {
      setState((ps) => ({
        ...ps,
        isLoading: false,
        contacts: [],
        error: err.response.msg,
      }));
    }
  };

  //Add Contact
  const addContact = async (contact) => {
    try {
      setState((ps) => ({ ...ps, isLoading: true }));
      const res = await axios.post('/api/contacts', contact, config);
      setState((ps) => ({
        ...ps,
        isLoading: false,
        contacts: [res.data, ...ps.contacts],
      }));

      //Re-applying the filter again to include the latest updates.
      if (state.filterText) setFilter(state.filterText);
    } catch (err) {
      setState((ps) => ({
        ...ps,
        isLoading: false,
        error: err.response.msg,
      }));
    }
  };

  //Update Contact
  const updateContact = async (contact) => {
    try {
      setState((ps) => ({ ...ps, isLoading: true }));
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      setState((ps) => ({
        ...ps,
        isLoading: false,
        contacts: ps.contacts.map((ct) =>
          ct._id === res.data._id ? res.data : ct
        ),
        filteredContacts:
          ps.filteredContacts === null
            ? null
            : ps.filteredContacts.map((ct) =>
                ct._id === res.data._id ? res.data : ct
              ),
      }));
    } catch (err) {
      setState((ps) => ({
        ...ps,
        isLoading: false,
        error: err.response.msg,
      }));
    }
  };

  //Delete Contact
  const deleteContact = async (id) => {
    try {
      setState((ps) => ({ ...ps, isLoading: true }));
      await axios.delete(`/api/contacts/${id}`);
      setState((ps) => ({
        ...ps,
        isLoading: false,
        contacts: ps.contacts.filter((ct) => ct._id !== id),
        filteredContacts:
          ps.filteredContacts === null
            ? null
            : ps.filteredContacts.filter((ct) => ct._id !== id),
      }));
    } catch (err) {
      setState((ps) => ({ ...ps, isLoading: false, error: err.response.msg }));
    }
  };

  //Set Current Contact
  const setSelectedContact = (contact) => {
    setState((ps) => ({ ...ps, selectedContact: contact }));
  };

  //Clear Current Contact
  const clearSelectedContact = () => {
    setState((ps) => ({ ...ps, selectedContact: null }));
  };

  //Filter Contacts
  const setFilter = (text) => {
    const regex = new RegExp(text, 'gi');
    setState((ps) => ({
      ...ps,
      filterText: text,
      filteredContacts: ps.contacts.filter((ct) => {
        return ct.name.match(regex) || ct.email.match(regex);
      }),
    }));
  };

  //Clear Filter
  const clearFilter = () => {
    setState((ps) => ({ ...ps, filterText: null, filteredContacts: null }));
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
