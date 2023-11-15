import {
    GET_SHIPPING_OPTIONS_SUCCESS,
    GET_SHIPPING_OPTIONS_FAIL,
    GET_SHIPPING_OPTION_SUCCESS,
    GET_SHIPPING_OPTION_FAIL,
} from '../action/types';

const initialState = {
    shipping: null,
    shipp: null,
};

export default function Shipping(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_SHIPPING_OPTIONS_SUCCESS:
            return {
                ...state,
                shipping: payload.shipping_options
            }
        case GET_SHIPPING_OPTIONS_FAIL:
            return {
                ...state,
                shipping: null
            }
        case GET_SHIPPING_OPTION_SUCCESS:
            return {
                ...state,
                shipp: payload.shipping_option
            }
        case GET_SHIPPING_OPTION_FAIL:
            return {
                ...state,
                shipp: null
            }
        default:
            return state;
    }
};