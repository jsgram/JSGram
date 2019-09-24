import {
    SET_SEARCH_VALUE,
    GET_SEARCH_RESULTS_SUCCESS,
    CLEAR_SEARCH_RESULTS,
    GET_MORE_RESULTS_SUCCESS,
    ALL_RESULTS_LOADED,
    CLEAR_LOADED,
    ADD_NEXT_RESULTS,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { IUser } from '../../components/Menu';

export const setSearchValue = (query: string): {type: string, payload: string} => ({
    type: SET_SEARCH_VALUE,
    payload: query,
});

export const getSearchResultsSuccess = (users: IUser[]): {type: string, payload: IUser[]} => ({
    type: GET_SEARCH_RESULTS_SUCCESS,
    payload: users,
});

export const clearSearchResults = (): {type: string} => ({
    type: CLEAR_SEARCH_RESULTS,
});

export const getMoreResultsSuccess = (users: IUser[]): {type: string, payload: IUser[]} => ({
    type: GET_MORE_RESULTS_SUCCESS,
    payload: users,
});

export const allResultsLoaded = (): {type: string} => ({
    type: ALL_RESULTS_LOADED,
});

export const clearLoaded = (): { type: string } => ({
    type: CLEAR_LOADED,
});

export const addNextResults = (page: number): { type: string, payload: number } => ({
    type: ADD_NEXT_RESULTS,
    payload: page,
});

export const getSearchResults = (query: string, page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.get(`/search/${query}/${page}`);
            if (page === 1) {
                dispatch(clearLoaded());
                dispatch(getSearchResultsSuccess(res.data.users));
            } else {
                dispatch(getMoreResultsSuccess(res.data.users));
            }
            if (!res.data.users.length) {
                dispatch(allResultsLoaded());
            }
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
