import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import createStore from './store/createStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(window.__INITIAL_STATE__);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
