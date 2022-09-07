import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import orderReducer from './order';

const createStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      order: orderReducer,
    },
  });

  return store;
};

export default createStore;
