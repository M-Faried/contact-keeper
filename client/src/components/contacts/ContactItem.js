import React, { useContext } from 'react';
import { ContactContext } from '../../context/ContactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  //Preparing component's data
  const { _id, name, email, phone, type } = contact;
  const { deleteContact, setSelectedContact } = useContext(ContactContext);

  //Preparing some view formats and styles
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  const btnStyle = { width: '100px' };
  const typeClassName = `badge ${
    type === 'professional' ? 'badge-success' : 'badge-primary'
  }`;

  //Event Handlers
  const onDelete = () => deleteContact(_id);
  const onEdit = () => setSelectedContact(contact);

  //Returning the result
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        <span className={typeClassName} style={{ float: 'right' }}>
          {formattedType}
        </span>
      </h3>

      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope'></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i>
            {phone}
          </li>
        )}
      </ul>

      <button
        className='btn btn-dark btn-small'
        style={btnStyle}
        onClick={onEdit}
      >
        Edit
      </button>

      <button
        className='btn btn-danger btn-small'
        style={btnStyle}
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;
