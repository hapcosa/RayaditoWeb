import axios from 'axios';
import {
    GET_SHIPPING_OPTIONS_SUCCESS,
    GET_SHIPPING_OPTIONS_FAIL,
    GET_SHIPPING_OPTION_SUCCESS,
    GET_SHIPPING_OPTION_FAIL
} from './types';

export const get_shipping_options = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/shipp/get-shipping-options`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_SHIPPING_OPTIONS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SHIPPING_OPTIONS_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: GET_SHIPPING_OPTIONS_FAIL
        });
    }
};


export const get_shipping_option_id = (ShippingId) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };


    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/shipp/get-shipping-option/${ShippingId}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_SHIPPING_OPTION_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SHIPPING_OPTION_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: GET_SHIPPING_OPTION_FAIL
        });
    }
};