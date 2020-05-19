import React, { useContext } from 'react';

import ContactList from '../contacts/ContactList';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

import Login from '../user/Login';
import Spinner from '../layout/Spinner';

import { UserContext } from '../../context/UserContext';

const Home = () => {
  const { isAuthenticated, isLoading } = useContext(UserContext);

  if (isLoading)
    return (
      <div className='wait-msg-container'>
        <h1>A moment please, data is being loaded...</h1>
        <Spinner />
      </div>
    );

  if (!isAuthenticated) return <Login />;

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <ContactList />
      </div>
    </div>
  );
};

export default Home;
