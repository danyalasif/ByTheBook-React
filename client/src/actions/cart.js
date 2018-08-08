import { ADD_TO_CART, REPOPULATE_CART } from '../constants/action-types';
import api from '../api';

export const addToCart = product => ({
    type: ADD_TO_CART,
    product
});

export const repopulateCart = products => ({
    type: REPOPULATE_CART,
    products
});

// export const addProduct = product => dispatch => dispatch(addToCart(product));
export const addProduct = product => dispatch =>
    api.cart.addProduct(product).then(book => {
        dispatch(addToCart(book));
    });
