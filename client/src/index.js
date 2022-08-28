import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'semantic-ui-css/semantic.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route } from 'react-router-dom';

import decode from 'jwt-decode';

import { createStore, applyMiddleware } from 'redux';
// import { createCart } from 'react-redux-shopping-cart';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from './rootReducer';

import { userLoggedIn } from './actions/auth';

import axios from 'axios';

// import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// const cart = createCart(store);

if (localStorage.bythebookJWT) {
    const payload = decode(localStorage.bythebookJWT);

    // const user = { token: localStorage.bythebookJWT };
    const user = {
        token: localStorage.bythebookJWT,
        email: payload.email,
        username: payload.username,
        confirmed: payload.confirmed
    };

    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
// registerServiceWorker();
