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

  //Clearing all the fields and the selectedContact if there was any.
  const clearAll = () => {
    clearSelectedContact();

    //The following is required to clear fields after add because add doesn't change
    //selectedContact, so useEffect will not be triggered in this case. So we need
    //to clear the login form by clearing the state.
    setContact(emptyContact);
  };

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      if (selectedContact === null) {
        addContact(contact);
      } else {
        updateContact(contact);
      }
      clearAll();
    }
  };

  return (
    <form onSubmit={onSubmit} className='form-container'>
      <h2 className='text-primary'>
        {selectedContact ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name...'
        name='name'
        value={name}
        onChange={onChange}
        autoComplete='false'
      />
      <input
        type='email'
        placeholder='Email...'
        name='email'
        value={email}
        onChange={onChange}
        autoComplete='false'
      />
      <input
        type='text'
        placeholder='Phone...'
        name='phone'
        value={phone}
        onChange={onChange}
        autoComplete='false'
      />
      <h5>Contact Type</h5>
      <input
        id='personal'
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      <label htmlFor='personal'>Personal </label>
      <input
        id='professional'
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      <label htmlFor='professional'>Professional</label>

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
