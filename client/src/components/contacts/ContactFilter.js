import React, { useContext, useRef } from 'react';
import { ContactContext } from '../../context/ContactContext';

const ContactFilter = () => {
  // Updating the filtered contacts
  const { setFilter, clearFilter } = useContext(ContactContext);
  const text = useRef('');

  //   useEffect(() => {
  //     if (filteredContacts === null) {
  //       text.current.value = '';
  //     }
  //   }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      setFilter(e.target.value);
    } else {
      clearFilter();
    }
  };

  const onSubmit = (e) => e.preventDefault();
  return (
    <form onSubmit={onSubmit} className='search-form'>
      <input
        ref={text}
        type='text'
        placeholder='Search contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
