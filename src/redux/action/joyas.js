import axios from "axios";
import {
    GET_JOYAS_SUCCESS,
    GET_JOYAS_BY_ARRIVAL_FAIL,
    GET_JOYAS_BY_ARRIVAL_SUCCESS,
    GET_JOYA_GALERY_SUCCESS,
    GET_JOYA_GALERY_FAIL,
    GET_JOYAS_FAIL,
    GET_JOYA_FAIL,
    GET_JOYA_SUCCESS,
    SEARCH_JOYAS_FAIL,
    SEARCH_JOYAS_SUCCESS,
    RELATED_JOYAS_FAIL,
    RELATED_JOYAS_SUCCESS,
    FILTER_JOYAS_FAIL,
    FILTER_JOYAS_SUCCESS,
} from './types';

export const get_joyas = () => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/get-joyas`, config)
            if(res.status===200) {
                dispatch({
                    type: GET_JOYAS_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type:GET_JOYAS_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:GET_JOYAS_FAIL
        });
    }
}
export const get_joyas_by_arrival = () => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/get-joyas?sortBy=date_create&order=desc&limit=4`, config)
            if(res.status===200) {
                dispatch({
                    type: GET_JOYAS_BY_ARRIVAL_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type:GET_JOYAS_BY_ARRIVAL_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:GET_JOYAS_BY_ARRIVAL_FAIL
        });
    }
}
export const get_joyas_id = (productId) => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/joyas/${productId}`, config)
            if(res.status===200) {
                dispatch({
                    type:GET_JOYA_SUCCESS,
                    payload:res.data
                })
            }else{
                dispatch({
                    type:GET_JOYA_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:GET_JOYA_FAIL
        });
    }
}

export const get_related_joyas = (productId) => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/related-joyas${productId}`, config)
            if(res.status===200) {
                dispatch({
                    type: RELATED_JOYAS_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type:RELATED_JOYAS_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:RELATED_JOYAS_FAIL
        });
    }
}

export const get_filtered_joyas = (category_id, price_range, sortBy, order) => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json',
            'content-type': 'application/json'
        }
    };
    const body = JSON.stringify({
        category_id,
        price_range,
        sortBy,
        order
    });
    console.log('out')
    try{   
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/by/search`, body, config);
            if(res.status===200 && !res.data.error) {
                console.log(res.data)
                dispatch({
                    type:FILTER_JOYAS_SUCCESS,
                    payload: res.data
                })
            }else{
                console.log('err')
                dispatch({   
                    type:FILTER_JOYAS_FAIL
                });
            }
    }
    catch(err) {
        console.log(err + "wtf")
        dispatch({
            type:FILTER_JOYAS_FAIL
        });
    }
}
export const get_search_joyas = (search, category_id) => async dispatch => {
    const config = {
        headers:{
            'Accept': 'application/json',
            'content-type': 'application/json'
        }
    };
    const body = JSON.stringify({
       search,
       category_id,
    });
    try{   
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/by/search`,body, config)
            if(res.status===200 && res.data.error) {
                dispatch({
                    type: SEARCH_JOYAS_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type:SEARCH_JOYAS_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:SEARCH_JOYAS_FAIL
        });
    }

}

export const get_joyas_id_galery = (productId) => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/galeryproduct/${productId}`, config)
            if(res.status===200) {
                dispatch({
                    type:GET_JOYA_GALERY_SUCCESS,
                    payload:res.data
                })
            }else{
                dispatch({
                    type:GET_JOYA_GALERY_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:GET_JOYA_GALERY_FAIL
        });
    }
}
