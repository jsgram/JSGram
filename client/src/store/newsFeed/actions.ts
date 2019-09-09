import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import {
    GET_NEWS_FEED_PENDING,
    GET_NEWS_FEED_SUCCESS,
    GET_MORE_NEWS_FEED_SUCCESS,
    ALL_NEWS_FEED_LOADED,
    CLEAR_NEWS_FEED_LOADED,
} from './actionTypes';
import { INewsFeed } from './reducers';

export const getNewsFeedPending = (): { type: string } => ({
    type: GET_NEWS_FEED_PENDING,
})

export const getNewsFeedSuccess = (userNews: INewsFeed): { type: string, payload: any } => ({
    type: GET_NEWS_FEED_SUCCESS,
    payload: userNews,
})

export const getMoreNewsFeedSuccess = (userNews: any): { type: string, payload: any } => ({
    type: GET_MORE_NEWS_FEED_SUCCESS,
    payload: userNews,
})

export const allNewsFeedLoaded = (): { type: string } => ({
    type: ALL_NEWS_FEED_LOADED,
})

export const clearNewsFeedLoaded = (): { type: string } => ({
    type: CLEAR_NEWS_FEED_LOADED,
})

export const getNewsFeedAsync = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getNewsFeedPending());
            const res = await AuthAPI.get(`/feed/1`);

            dispatch(getNewsFeedSuccess(res.data.feed));
            dispatch(clearNewsFeedLoaded());
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getMoreNewsFeedAsync = (page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getNewsFeedPending());
            const res = await AuthAPI.get(`/feed/${page}`);

            if (!res.data.feed.length) {
                dispatch(allNewsFeedLoaded());
                return;
            }

            dispatch(getMoreNewsFeedSuccess(res.data.feed));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
