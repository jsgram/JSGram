import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import {
    GET_MENTION_LIST_PENDING,
    GET_MENTION_LIST_SUCCESS,
    GET_MORE_MENTION_LIST_SUCCESS,
    UPLOAD_NEXT_MENTION_LIST,
    ALL_MENTION_LIST_LOADED,
    CLEAR_MENTION_LIST_LOADED,
} from './actionTypes';
import { INewsFeed } from './reducers';

export const getMentionListPending = (): { type: string } => ({
    type: GET_MENTION_LIST_PENDING,
});

export const getMentionListSuccess = (userNews: INewsFeed): { type: string, payload: INewsFeed } => ({
    type: GET_MENTION_LIST_SUCCESS,
    payload: userNews,
});

export const getMoreMentionListSuccess = (userNews: INewsFeed): { type: string, payload: INewsFeed } => ({
    type: GET_MORE_MENTION_LIST_SUCCESS,
    payload: userNews,
});

export const addNextMentionList = (page: number): { type: string, payload: number } => ({
    type: UPLOAD_NEXT_MENTION_LIST,
    payload: page,
});

export const clearMentionListLoaded = (): { type: string } => ({
    type: CLEAR_MENTION_LIST_LOADED,
});

export const allMentionListLoaded = (): { type: string } => ({
    type: ALL_MENTION_LIST_LOADED,
});

export const getMentionListAsync = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getMentionListPending());
            const res = await AuthAPI.get('/mention/1');
            dispatch(getMentionListSuccess(res.data.posts));
            dispatch(clearMentionListLoaded());
        } catch (e) {
            dispatch(showAlert(e, 'danger'));
        }
    };

export const getMoreMentionListAsync = (page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getMentionListPending());
            const res = await AuthAPI.get(`/mention/${page}`);

            if (!res.data.posts.length) {
                dispatch(allMentionListLoaded());
                return;
            }

            dispatch(getMoreMentionListSuccess(res.data.posts));
        } catch (e) {
            dispatch(showAlert(e, 'danger'));
        }
    };
