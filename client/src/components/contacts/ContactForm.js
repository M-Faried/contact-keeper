import React, { useContext, useState, useEffect } from 'react';
import { ContactContext } from '../../context/ContactContext';

const emptyContact = {
  name: '',
  email: '',
  phone: '',
  type: 'personal',
};

const ContactForm = () => {
  //Fetching context services.
  const {
    addContact,
    selectedContact,
    clearSelectedContact,
    updateContact,
  } = useContext(ContactContext);

  //Preparing form state.
  const [contact, setContact] = useState(emptyContact);
  const { name, email, phone, type } = contact;

  //Handling the initial state.
  useEffect(() => {
    if (selectedContact !== null) {
      setContact(selectedContact);
    } else {
      setContact(emptyContact);
    }
  }, [selectedContact]);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      if (selectedContact) {
        updateContact(contact);
        clearSelectedContact();
      } else {
        addContact(contact);
        setContact(emptyContact);
      }
    }
  };

  const clearAll = () => clearSelectedContact();

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {selectedContact ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name...'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email...'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone...'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{'  '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type='submit'
          value={selectedContact ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {selectedContact && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;