

// import {
//     ADD_TO_CART,
//     CLEAR_CART,
//     REPOPULATE_CART
// } from '../constants/action-types';
// import api from '../api';

// let initialCart = [];
// api.cart.getCart().then(data => {
//     if (undefined) initialCart = [];
//     else initialCart = data;
// });

// export default function cart(state = [], action = {}) {
//     switch (action.type) {
//         case ADD_TO_CART:
//             if (state.some(e => e.book_id === action.product.book_id)) {
//                 return state.filter(
//                     prod => prod.book_id !== action.product.book_id
//                 );
//             }
//             return [...state, action.product];
//         case CLEAR_CART:
//             return [];
//         case REPOPULATE_CART:
//             return action.products;
//         default:
//             return state;
//     }
// }
