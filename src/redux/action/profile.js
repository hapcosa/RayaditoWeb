import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    DELETE_USER_PROFILE_SUCCESS,
    DELETE_USER_PROFILE_FAIL,
} from './types';

export const get_user_profiles = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile/user`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_USER_PROFILE_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_USER_PROFILE_FAIL
            });
        }
    }
}


export const update_user_profile = (
    first_name,
    last_name,
    address_line_1,
    city,
    state_province_region,
    zipcode,
    phone,
) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify({
            first_name,
            last_name,
            address_line_1,
            city,
            state_province_region,
            zipcode,
            phone,
        });

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/update`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: UPDATE_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
                dispatch(setAlert('Profile updated successfully', 'green'));
            } else {
                dispatch({
                    type: UPDATE_USER_PROFILE_FAIL
                });
                dispatch(setAlert('Failed to update profile', 'red'));
            }
        } catch(err) {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
            dispatch(setAlert('Failed to update profile', 'red'));
        }
    }
}

export const create_user_profile = (
    first_name,
    last_name,
    address_line_1,
    city,
    zipcode,
    phone,
    country_region,
) => async dispatch => {  
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify({
            first_name,
            last_name,
            address_line_1,
            city,
            zipcode,
            phone,
            country_region,
        });

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/create`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: UPDATE_USER_PROFILE_SUCCESS,
                    payload: res.data
                });
                dispatch(setAlert('Profile updated successfully', 'green'));
            } else {
                dispatch({
                    type: UPDATE_USER_PROFILE_FAIL
                });
                dispatch(setAlert('Error al crear dirección', 'red'));
            }
        } catch(err) {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
            dispatch(setAlert('Error al crear dirección', 'red'));
        }
    }
}

export const delete_user_profile = (profile_id) => async dispatch =>{
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
    }
    const body = JSON.stringify({
        profile_id
    });

        try{
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/profile/delete`, body, config)
            if(res.status===200){
                dispatch({
                    type: DELETE_USER_PROFILE_SUCCESS
                })
            }
        }catch(err){
            dispatch({
                type: DELETE_USER_PROFILE_FAIL
            })
        }

}