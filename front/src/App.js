import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginRoute from './private/login';
import ContactPage from './pages/contact/Contact';
import UserPage from './pages/user/User';
import CompanyPage from './pages/company/Company';
import RegionPage from './pages/region/Region';
import LoginPage from './pages/login/Login';
import Header from './components/common/header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { getRegions } from './actions/region';
import { getCompanies } from './actions/company';

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    if (user) dispatch(getRegions()); dispatch(getCompanies())
  }, [user])

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={'/'} >
          {user ? <Redirect to={'/contact'} /> : <LoginPage />}
        </Route>
        <LoginRoute exact path={'/contact'} component={ContactPage} />
        <LoginRoute exact path={'/user'} component={UserPage} />
        <LoginRoute exact path={'/company'} component={CompanyPage} />
        <LoginRoute exact path={'/region'} component={RegionPage} />
        <Redirect to='/' />
      </Switch>
    </>
  );
}

export default App;
