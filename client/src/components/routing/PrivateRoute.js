import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(UserContext);
  const { isAuthenticated, initialized } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && initialized ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
