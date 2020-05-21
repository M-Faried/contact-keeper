import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from '../../context/AlertContext';
import { UserContext } from '../../context/UserContext';

const emptyUser = {
  email: '',
  password: '',
};

const Login = (props) => {
  //Preparing contexts
  const { showAlert } = useContext(AlertContext);
  const { isAuthenticated, error, login, clearErrors } = useContext(
    UserContext
  );

  useEffect(() => {
    //Directing the user to the home page if he is authenticated.
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      showAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  //Preparing component state.
  const [user, setUser] = useState(emptyUser);
  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(email && password)) {
      showAlert('Please enter all fields to register', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
            autoComplete='true'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
            autoComplete='true'
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
