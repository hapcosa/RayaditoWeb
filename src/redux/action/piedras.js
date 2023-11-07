import axios from "axios";
import {
    GET_PIEDRAS_SUCCESS,
    GET_PIEDRAS_BY_ARRIVAL_FAIL,
    GET_PIEDRAS_BY_ARRIVAL_SUCCESS,
    GET_PIEDRA_GALERY_SUCCESS,
    GET_PIEDRA_GALERY_FAIL,
    GET_PIEDRAS_FAIL,
    GET_PIEDRA_FAIL,
    GET_PIEDRA_SUCCESS,
    SEARCH_PIEDRAS_FAIL,
    SEARCH_PIEDRAS_SUCCESS,
    RELATED_PIEDRAS_FAIL,
    RELATED_PIEDRAS_SUCCESS,
    FILTER_PIEDRAS_FAIL,
    FILTER_PIEDRAS_SUCCESS,
} from './types';

export const get_piedras = () => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/get-piedras`, config)
            if(res.status===200) {
                dispatch({
                    type: GET_PIEDRAS_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type:GET_PIEDRAS_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:GET_PIEDRAS_FAIL
        });
    }
}
export const get_piedras_by_arrival = () => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/get-piedras?sortBy=date_create&order=desc&limit=4`, config)
            if(res.status===200) {
                dispatch({
                    type: GET_PIEDRAS_BY_ARRIVAL_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type:GET_PIEDRAS_BY_ARRIVAL_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:GET_PIEDRAS_BY_ARRIVAL_FAIL
        });
    }
}
export const get_piedras_id = (productId) => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/piedras/${productId}`, config)
            if(res.status===200) {
                console.log("success")
                dispatch({
                    type:GET_PIEDRA_SUCCESS,
                    payload:res.data
                })
            }else{
                dispatch({
                    type:GET_PIEDRA_FAIL
                });
            }
    }
    catch(err) {
        console.log("agg");
        dispatch({
            type:GET_PIEDRA_FAIL
        });
    }
}

export const get_related_piedras = (productId) => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/related-piedras${productId}`, config)
            if(res.status===200) {
                dispatch({
                    type: RELATED_PIEDRAS_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type:RELATED_PIEDRAS_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:RELATED_PIEDRAS_FAIL
        });
    }
}

export const get_filtered_piedras = (category_id, price_range, sortBy, order) => async dispatch =>{
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
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/piedras/by/search`, body, config);
            if(res.status===200 && !res.data.error) {
                console.log(res.data)
                dispatch({
                    type:FILTER_PIEDRAS_SUCCESS,
                    payload: res.data
                })
            }else{
                console.log('err')
                dispatch({   
                    type:FILTER_PIEDRAS_FAIL
                });
            }
    }
    catch(err) {
        console.log(err + "wtf")
        dispatch({
            type:FILTER_PIEDRAS_FAIL
        });
    }
}
export const get_search_piedras = (search, category_id) => async dispatch => {
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
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/piedras/by/search`,body, config)
            if(res.status===200 && res.data.error) {
                dispatch({
                    type: SEARCH_PIEDRAS_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type:SEARCH_PIEDRAS_FAIL
                });
            }
    }
    catch(err) {
        dispatch({
            type:SEARCH_PIEDRAS_FAIL
        });
    }

}

export const get_piedras_id_galery = (productId) => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    };
    console.log("antes try");
    try{   
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/galeryproduct/${productId}`, config)
            if(res.status===200) {
                console.log("success")
                dispatch({
                    type:GET_PIEDRA_GALERY_SUCCESS,
                    payload:res.data
                })
            }else{
                dispatch({
                    type:GET_PIEDRA_GALERY_FAIL
                });
            }
    }
    catch(err) {
        console.log("agg");
        dispatch({
            type:GET_PIEDRA_GALERY_FAIL
        });
    }
}
