import React, { useContext, useEffect, Fragment } from 'react';
import { ContactContext } from '../../context/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const ContactList = () => {
  const { contacts, filteredContacts, isLoading, loadContacts } = useContext(
    ContactContext
  );

  useEffect(() => {
    loadContacts();
    //eslint-disable-next-line
  }, []);

  //We return the spinner if the contacts are being loaded.
  if (isLoading) return <Spinner />;

  //Now it is loaded but there are no contacts, the user is asked to add contacts.
  if (contacts.length === 0) return <h4>Please add contacts</h4>;

  const source = filteredContacts !== null ? filteredContacts : contacts;
  return (
    <Fragment>
      {source.map((ct) => (
        <ContactItem key={ct._id} contact={ct} />
      ))}
    </Fragment>
  );
};

export default ContactList;
