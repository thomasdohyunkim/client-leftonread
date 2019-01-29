import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { toggleWidget } from 'react-chat-widget';
import reducers from './reducers';
import { ActionTypes } from './actions';

import './styles/style.scss';

import App from './components/app';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const token = localStorage.getItem('token');
const firstName = localStorage.getItem('lorFirstName');
const email = localStorage.getItem('lorEmail');
if (token && firstName && email) {
  const user = {
    firstName,
    email,
  };
  store.dispatch({ type: ActionTypes.AUTH_USER, payload: user });
}

toggleWidget();

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('main'),
);
