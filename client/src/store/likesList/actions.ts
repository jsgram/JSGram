import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import {
    GET_LIKE_LIST_PENDING,
    GET_LIKE_LIST_SUCCESS,
    GET_MORE_LIKE_LIST_SUCCESS,
    UPLOAD_NEXT_LIKE_LIST,
    ALL_LIKE_LIST_LOADED,
    CLEAR_LIKE_LIST_LOADED,
} from './actionTypes';
import { INewsFeed } from './reducers';

export const getLikeListPending = (): { type: string } => ({
    type: GET_LIKE_LIST_PENDING,
});

export const getLikeListSuccess = (userNews: INewsFeed): { type: string, payload: any } => ({
    type: GET_LIKE_LIST_SUCCESS,
    payload: userNews,
});

export const getMoreLikeListSuccess = (userNews: any): { type: string, payload: any } => ({
    type: GET_MORE_LIKE_LIST_SUCCESS,
    payload: userNews,
});

export const addNextLikeList = (page: number): { type: string, payload: number } => ({
    type: UPLOAD_NEXT_LIKE_LIST,
    payload: page,
});

export const clearLikeListLoaded = (): { type: string } => ({
    type: CLEAR_LIKE_LIST_LOADED,
});

export const allLikeListLoaded = (): { type: string } => ({
    type: ALL_LIKE_LIST_LOADED,
});

export const getLikeListAsync = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getLikeListPending());
            const res = await AuthAPI.get('/feed/1');

            dispatch(getLikeListSuccess(res.data.feed));
            dispatch(clearLikeListLoaded());
        } catch (e) {
            dispatch(showAlert(e, 'danger'));
        }
    };

export const getMoreLikeListAsync = (page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getLikeListPending());
            const res = await AuthAPI.get(`/feed/${page}`);

            if (!res.data.feed.length) {
                dispatch(allLikeListLoaded());
                return;
            }

            dispatch(getMoreLikeListSuccess(res.data.feed));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
