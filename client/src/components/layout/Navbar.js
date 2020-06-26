import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/UserContext';

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, user, loadUser, logout } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    //eslint-disable-next-line
  }, []);

  const onLogout = () => logout();

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'>
          <i className='fa fa-user'></i>
          {user && <span className='hide-sm'>{user.name}</span>}
        </Link>
      </li>
      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>{' '}
        </a>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/'>Login</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/about'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
