import { combineReducers } from 'redux';
// import { cartReducer } from 'react-redux-shopping-cart';

import user from './reducers/user';
import cart from "./reducers/cart"

export default combineReducers({
    user,
    cart
});
