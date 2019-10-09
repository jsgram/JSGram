import {
    GET_SEARCH_RESULTS_SUCCESS,
    GET_SEARCH_RESULTS_PENDING,
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

export const getSearchResultsSuccess = (users: IUser[]): {type: string, payload: IUser[]} => ({
    type: GET_SEARCH_RESULTS_SUCCESS,
    payload: users,
});

export const getSearchResultsPending = (): {type: string} => ({
    type: GET_SEARCH_RESULTS_PENDING,
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
            const FIRST_PAGE = 1;
            const RESULTS_RER_PAGE = 5;
            dispatch(getSearchResultsPending());
            const res = await AuthAPI.get(`/search/${query}/${page}`);
            if (page === FIRST_PAGE) {
                dispatch(clearLoaded());
                dispatch(getSearchResultsSuccess(res.data.results));
            } else {
                dispatch(getMoreResultsSuccess(res.data.results));
            }
            if (!res.data.results.length || res.data.results.length < RESULTS_RER_PAGE) {
                dispatch(allResultsLoaded());
            }
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
