import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginRoute from './private/login';
import AdminRoute from './private/admin';
import ContactPage from './pages/Contacts';
import UserPage from './pages/Users';
import CompanyPage from './pages/Companies';
import RegionPage from './pages/Regions';
import LoginPage from './pages/login/Login';
import Header from './components/common/header/Header';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector(state => state.auth.user)
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={'/'} >
          {user ? <Redirect to={'/contact'}/> : <LoginPage/>}
        </Route>
        <LoginRoute exact path={'/contact'} component={ContactPage} />
        <AdminRoute exact path={'/user'} component={UserPage} />
        <LoginRoute exact path={'/company'} component={CompanyPage} />
        <LoginRoute exact path={'/region'} component={RegionPage} />
        <Redirect to='/' />
      </Switch>
    </>
  );
}

export default App;
