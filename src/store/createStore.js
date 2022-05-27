import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

const createStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  return store;
};

export default createStore;
