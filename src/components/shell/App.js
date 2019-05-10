import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useSelector, useActions } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import '../shared/main.scss';
import { theme } from '../../styles';

import LoginScreen from '../loginScreen/LoginScreen';
import Content from './Content';

import * as API from '../../api';
import Registration from '../registration/Registration';
import Loading from '../shared/Loading';
import {
  logout as logoutAction,
  setLoginStatus as loginStatusAction,
  setUserData as setUserDataAction,
} from '../../redux/auth';


const App = withRouter(({ history }) => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const accessToken = useSelector(state => state.auth.accessToken);
  const setUserData = useActions(data => setUserDataAction(data));

  const { logout, setLoginStatus } = useActions({
    logout: logoutAction,
    setLoginStatus: loginStatusAction,
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      logout();
      setTimeout(() => setIsLoading(false), 0);
    } else {
      const loginStatusChecking = async () => {
        try {
          await API.checkStatus();
          setLoginStatus(true);

          const userData = await API.getUserData();
          setUserData(userData);
        } catch (error) {
          //
        }
        setTimeout(() => setIsLoading(false), 0);
      };
      loginStatusChecking();
    }
  }, [accessToken, logout, setLoginStatus, setUserData]);

  useEffect(() => {
    if (!loggedIn) history.replace('/logowanie');
  }, [history, loggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/logowanie" component={LoginScreen} />
        <Route path="/rejestracja" component={Registration} />
        <Route
          path="/wyloguj"
          render={() => {
            setTimeout(() => { logout(); });
          }}
        />

        <Route render={() => (
          <Loading isLoading={isLoading} type="alt" text="Ładowanie...">
            <Content />
          </Loading>
        )}
        />
      </Switch>
    </ThemeProvider>
  );
});


export default App;
