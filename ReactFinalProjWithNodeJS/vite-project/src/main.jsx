import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Form } from 'react-router-dom';
import store from './utils/store.js';
import App from './App.jsx';

ReactDOM.createRoot( document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
 );

