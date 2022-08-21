import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, REPOPULATE_CART } from '../constants/action-types';

const DEFAULT_STATE = {
    items: [],
    count: 0
}
export default function cart(state = DEFAULT_STATE, action = {}) {
    switch (action.type) {
        case ADD_TO_CART:
            console.log({ payload: action.payload })
            return [...state, action.payload];
        case REMOVE_FROM_CART:
            return {};
        case REPOPULATE_CART:
            return action.payload.data;
        case CLEAR_CART:
            return []

        default:
            return state;
    }
}
