import { ADD_TO_CART, REPOPULATE_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants/action-types';
import api from '../api';

export const addToCart = product => ({
    type: ADD_TO_CART,
    payload: product
});

export const removeFromCart = productId => ({
    type: REMOVE_FROM_CART,
    payload: productId
})

export const repopulateCart = products => ({
    type: REPOPULATE_CART,
    payload: products
});

export const clearCart = () => ({
    type: CLEAR_CART
})

// export const addProduct = product => dispatch => dispatch(addToCart(product));
export const addProduct = product => dispatch => {
    console.log({ product })
    api.cart.addProduct(product).then(book => {
        dispatch(addToCart(book));
    });
}

export const updateCartThunk = cartItems => dispatch => {
    console.log({ cartItems })
    api.cart.updateCart(cartItems).then(cartItems => {
        dispatch(repopulateCart(cartItems))
    })
}
