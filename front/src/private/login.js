import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {

    const user = useSelector(state => state.user.user);
  
    return (
      <Route {...rest} render={(props) => (
        user ? <Component {...props} /> : <Redirect to='/' />
      )}
      />
    );
  }

export default PrivateRoute;