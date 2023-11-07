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
    FILTER_JOYAS_SUCCESS
} from '../action/types';

const initialState = {
    joyas: null,
    joyas_arrival: null,
    joya: null,
    search_joyas: null,
    related_joyas: null,
    filtered_joyas: null,
    joya_galery: null,
}

export default function Joyas(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {

        case GET_JOYAS_SUCCESS:
            return {
                ... state,
                joyas: payload.joyas
            }
        case GET_JOYAS_FAIL:
            return {
                ... state,
                joyas: null
            }
        case GET_JOYAS_BY_ARRIVAL_SUCCESS:
            return {
                ... state,
                joyas_arrival: payload.joyas
            }
        case GET_JOYAS_BY_ARRIVAL_FAIL:
            return {
                ... state,
                joyas_arrival: null
            }
        case GET_JOYA_SUCCESS:
            return {
                ... state,
                joya:payload.joya
            }
        case GET_JOYA_FAIL:
            return {
                ... state,
                joya: null
            }
        case GET_JOYA_GALERY_SUCCESS:
            return {
                ... state,
                joya_galery: payload.gallery
            }
        case GET_JOYA_GALERY_FAIL:
            return {
                ... state,
                joya_galery: null
            }
        case RELATED_JOYAS_SUCCESS:
            return {
                ... state,
                related_joyas: payload.related_products
            }
        case RELATED_JOYAS_FAIL:
            return {
                ... state,
                related_joyas: null
            }
        case FILTER_JOYAS_SUCCESS:
            return {
                ... state,
                filtered_joyas: payload.filtered_products
            }
        case FILTER_JOYAS_FAIL:
            return {
                ... state,
                filtered_joyas: null
            }
        case SEARCH_JOYAS_SUCCESS:
            return {
                ... state,
                search_joyas: payload.search_joyas
            }
        case SEARCH_JOYAS_FAIL:
            return {
                ... state,
                search_joyas: null
            }
        default:
            return state
    }
}
