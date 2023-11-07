import {
    GET_PAYMENT_TOTAL_SUCCESS,
    GET_PAYMENT_TOTAL_FAIL,
    LOAD_BT_TOKEN_SUCCESS,
    LOAD_BT_TOKEN_FAIL,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
    RESET_PAYMENT_INFO,
    SET_PAYMENT_LOADING,
    REMOVE_PAYMENT_LOADING,
    STATUS_PAYMENT_REJECTED,
    STATUS_PAYMENT_SUCCESS,
    STATUS_PAYMENT_CANCELED,
} from '../action/types';


const initialState = {
    made_payment: false,
    original_price: 0.0,
    total_amount: 0.0,
    loading: false,
    error: null,
    url: null,
    status: null
};

export default function Payment(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PAYMENT_TOTAL_SUCCESS:
            return {
                ...state,
            }
        case GET_PAYMENT_TOTAL_FAIL:
            return {
                ...state,
                original_price: 0.00,
                total_amount: 0.00,
                url: null

            }
        case PAYMENT_SUCCESS:
            return {
                ...state,
                made_payment: true,
                url: payload.response.init_point,
            }
        case PAYMENT_FAIL:
            return {
                ...state,
                made_payment: false,
                url: null

            }
        case SET_PAYMENT_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_PAYMENT_LOADING:
            return {
                ...state,
                loading: false
            }
        case STATUS_PAYMENT_SUCCESS:
            return {
                ...state,
                status: payload.status
            }
        case STATUS_PAYMENT_REJECTED:
             return {
                ...state,
                 status: payload.status
            }

        case RESET_PAYMENT_INFO:
            return {
                ...state,
                made_payment: false,
                original_price: 0.0,
                total_amount: 0.0,
                loading: false,
                error: null,
                url: null,
                status: null
            }
        default:
            return state;
    }
}