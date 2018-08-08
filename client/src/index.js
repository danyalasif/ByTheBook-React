import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route } from 'react-router-dom';

import decode from 'jwt-decode';

import { createStore, applyMiddleware } from 'redux';
import { createCart } from 'react-redux-shopping-cart';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

import { userLoggedIn } from './actions/auth';

import axios from 'axios';

// import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const cart = createCart(store);

if (localStorage.bythebookJWT) {
    const payload = decode(localStorage.bythebookJWT);

    // const user = { token: localStorage.bythebookJWT };
    const user = {
        token: localStorage.bythebookJWT,
        email: payload.email,
        username: payload.username,
        confirmed: payload.confirmed
    };

    axios
        .get('/api/cart/cartItems')
        .then(res => {
            console.log(res.data);
            const items = res.data.map(item => {
                return {
                    id: item.book_id._id,
                    price: item.book_id.price,
                    qty: item.order_quantity
                };
            });

            return items;
        })
        .then(items => {
            console.log(items);
            cart.setCart({ items: [...items] });
        });

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
