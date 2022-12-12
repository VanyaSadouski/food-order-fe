import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { check } from './http/userAPI';
import { setOrderInfo } from './store/order';
import { setUserInfo } from './store/user';

function App() {
  const dispatch = useDispatch();
  const [isDataFetched, setFetched] = useState();
  useEffect(() => {
    async function checkAuth() {
      if (localStorage.getItem('token')) {
        const checkResp = await check();
        if (checkResp?.auth) {
          const { role, firstName, lastName, email, phone, _id } = checkResp.user;
          dispatch(
            setUserInfo({ isAdmin: role === 'admin', firstName, lastName, email, phone, authenticated: true, _id }),
          );
          if (localStorage.getItem('orderInfo')) {
            dispatch(setOrderInfo(JSON.parse(localStorage.getItem('orderInfo'))));
          }
        }
      }
      setFetched(true);
    }
    checkAuth();
  }, []);
  return isDataFetched ? (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '50px' }}>
        <AppRouter style={{ padding: '50px' }} />
      </div>
    </BrowserRouter>
  ) : null;
}

export default App;
