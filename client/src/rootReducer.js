import { combineReducers } from 'redux';
import { cartReducer } from 'react-redux-shopping-cart';

import user from './reducers/user';

export default combineReducers({
    user,
    cart: cartReducer
});
