import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import preloadedUser from './redux/stores/preloaded_user';
import configureStore from './redux/stores/configure_store';
import App from './modules/app/App';

import './styles/app';

const userInitialState = preloadedUser();
const store = configureStore({ userInitialState });
const root = document.getElementById('root');

render((
  <Provider store={store}>
    <App />
  </Provider>
), root);
