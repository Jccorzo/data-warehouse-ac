import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginRoute from './private/login';
import AdminRoute from './private/admin';
import ContactPage from './pages/Contacts';
import UserPage from './pages/Users';
import CompanyPage from './pages/Companies';
import RegionPage from './pages/Regions';
import LoginPage from './pages/Login';

const App = () => {
  return (
    <Switch>
      <Route exact path={'/'} component={LoginPage} />
      <LoginRoute exact path={'/contact'} component={ContactPage} />
      <AdminRoute exact path={'/user'} component={UserPage} />
      <LoginRoute exact path={'/company'} component={CompanyPage} />
      <LoginRoute exact path={'/region'} component={RegionPage} />
      <Redirect to='/' />
    </Switch>
  );
}

export default App;
