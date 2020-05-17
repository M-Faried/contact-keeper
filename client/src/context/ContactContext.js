import React, { createContext, useState } from 'react';
import * as uuid from 'uuid';

export const ContactContext = createContext();

export const ContactContextProvider = (props) => {
  const [contacts, setContacts] = useState(testCotnacts);
  const [selectedContact, setSelected] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState(null);

  //Add Contact
  const addContact = (contact) => {
    contact._id = uuid.v4();
    setContacts([contact, ...contacts]);
  };

  //Delete Contact
  const deleteContact = (id) => {
    setContacts(contacts.filter((ct) => ct._id !== id));
  };

  //Set Current Contact
  const setSelectedContact = (contact) => {
    setSelected(contact);
  };

  //Clear Current Contact
  const clearSelectedContact = () => {
    setSelected(null);
  };

  //Update Contact
  const updateContact = (contact) => {
    setContacts(contacts.map((ct) => (ct._id === contact._id ? contact : ct)));
  };

  //Filter Contacts
  const setFilter = (text) => {
    const regex = new RegExp(text, 'gi');
    setFilteredContacts(
      contacts.filter((ct) => {
        return ct.name.match(regex) || ct.email.match(regex);
      })
    );
  };

  //Clear Filter
  const clearFilter = () => {
    setFilteredContacts(null);
  };

  const services = {
    contacts,
    selectedContact,
    filteredContacts,
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

const testCotnacts = [
  {
    _id: 1,
    name: 'Jill Johnson',
    email: 'jill@gmail.com',
    phone: '111-111-1111',
    type: 'personal',
  },
  {
    _id: 2,
    name: 'Sara Watson',
    email: 'sara@gmail.com',
    phone: '111-111-1112',
    type: 'personal',
  },
  {
    _id: 3,
    name: 'Harry White',
    email: 'harry@gmail.com',
    phone: '111-111-1113',
    type: 'professional',
  },
];
