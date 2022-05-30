import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { check } from './http/userAPI';
import { setUserInfo } from './store/user';

function App() {
  const dispatch = useDispatch();
  const [isDataFetched, setFetched] = useState();
  useEffect(() => {
    async function checkAuth() {
      if (localStorage.getItem('token')) {
        const checkResp = await check();
        setFetched(true);
        if (checkResp?.auth) {
          const { role, firstName, lastName, email, phone } = checkResp.user;
          dispatch(setUserInfo({ isAdmin: role === 'admin', firstName, lastName, email, phone, authenticated: true }));
        }
      }
    }
    checkAuth();
  }, []);
  return isDataFetched ? (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  ) : null;
}

export default App;
