import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {

  const user = useSelector(state => state.user.user);

  return (
    <Route {...rest} render={(props) => (
      user ? (user.admin ? <Component {...props} /> : <Redirect to='/contact' />) : <Redirect to='/' />
    )}
    />
  );
}

export default PrivateRoute;