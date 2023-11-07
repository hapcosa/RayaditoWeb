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
    FILTER_PIEDRAS_SUCCESS
} from '../action/types';

const initialState = {
    piedras: null,
    piedras_arrival: null,
    piedra: null,
    search_piedras: null,
    related_piedras: null,
    filtered_piedras: null,
    piedra_galery: null,
}

export default function Piedras(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {

        case GET_PIEDRAS_SUCCESS:
            return {
                ... state,
                piedras: payload.piedras
            }
        case GET_PIEDRAS_FAIL:
            return {
                ... state,
                piedras: null
            }
        case GET_PIEDRAS_BY_ARRIVAL_SUCCESS:
            return {
                ... state,
                piedras_arrival: payload.piedras
            }
        case GET_PIEDRAS_BY_ARRIVAL_FAIL:
            return {
                ... state,
                piedras_arrival: null
            }
        case GET_PIEDRA_SUCCESS:
            return {
                ... state,
                piedra:payload.piedra
            }
        case GET_PIEDRA_FAIL:
            return {
                ... state,
                piedra: null
            }
        case GET_PIEDRA_GALERY_SUCCESS:
            return {
                ... state,
                piedra_galery: payload.gallery
            }
        case GET_PIEDRA_GALERY_FAIL:
            return {
                ... state,
                piedra_galery: null
            }
        case RELATED_PIEDRAS_SUCCESS:
            return {
                ... state,
                related_piedras: payload.related_products
            }
        case RELATED_PIEDRAS_FAIL:
            return {
                ... state,
                related_piedras: null
            }
        case FILTER_PIEDRAS_SUCCESS:
            return {
                ... state,
                filtered_piedras: payload.filtered_products
            }
        case FILTER_PIEDRAS_FAIL:
            return {
                ... state,
                filtered_piedras: null
            }
        case SEARCH_PIEDRAS_SUCCESS:
            return {
                ... state,
                search_piedras: payload.search_piedras
            }
        case SEARCH_PIEDRAS_FAIL:
            return {
                ... state,
                search_piedras: null
            }
        default:
            return state
    }
}
