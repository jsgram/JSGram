import {
    GET_SEARCH_RESULTS_SUCCESS,
    CLEAR_SEARCH_RESULTS,
    GET_MORE_RESULTS_SUCCESS,
    ALL_RESULTS_LOADED,
    CLEAR_LOADED,
    ADD_NEXT_RESULTS,
} from './actionTypes';
import { IUser } from '../../components/Menu';

interface IDefaultState {
    searchResults: IUser[];
    loaded: boolean;
    page: number;
}

const defaultState = {
    searchResults: [],
    loaded: false,
    page: 1,
};

export const searchReducer = (state: IDefaultState = defaultState, action: { type: string, payload: any }): any => {
    switch (action.type) {
        case GET_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                searchResults: [...action.payload],
            };
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: [],
                page: 1,
                loaded: false,
            };
        case GET_MORE_RESULTS_SUCCESS:
            return {
                ...state,
                searchResults: [...state.searchResults, ...action.payload],
            };
        case ALL_RESULTS_LOADED:
            return {
                ...state,
                loaded: true,
                page: 1,
            };
        case CLEAR_LOADED:
            return {
                ...state,
                loaded: false,
            };
        case ADD_NEXT_RESULTS:
            return {
                ...state,
                page: action.payload,
            };
        default:
            return state;
    }
};
