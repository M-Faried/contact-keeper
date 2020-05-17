import React, { useContext, Fragment } from 'react';
import { ContactContext } from '../../context/ContactContext';
import ContactItem from './ContactItem';

const ContactList = () => {
  const { contacts, filteredContacts } = useContext(ContactContext);

  const source = filteredContacts !== null ? filteredContacts : contacts;

  if (contacts.length === 0) return <h4>Please add contacts</h4>;
  else
    return (
      <Fragment>
        {source.map((ct) => (
          <ContactItem key={ct._id} contact={ct} />
        ))}
      </Fragment>
    );
};

export default ContactList;
