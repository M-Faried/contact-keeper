import React, { useContext, useEffect, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import Home from '../pages/Home';
import Login from '../user/Login';
import Spinner from '../layout/Spinner';

const HomeRoute = ({ ...args }) => {
  const { isAuthenticated, isLoading, loadUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    //eslint-disable-next-line
  }, []);

  if (isLoading)
    return (
      <Fragment>
        <h1>A moment please, data is being loaded</h1>
        <Spinner />
      </Fragment>
    );

  return <Route {...args} component={isAuthenticated ? Home : Login} />;
};

export default HomeRoute;
