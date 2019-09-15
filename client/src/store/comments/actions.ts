import {
    GET_COMMENTS,
    GET_COMMENTS_PENDING,
    ALL_COMMENTS_LOADED,
    GET_MORE_COMMENTS_SUCCESS,
    ADD_NEXT_COMMENTS_PAGE,
    RESET_COMMENTS,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { IComments } from './reducers';

export const getComments = (comments: IComments): { type: string, payload: IComments } => ({
    type: GET_COMMENTS,
    payload: comments,
});

export const getCommentsPending = (): { type: string } => ({
    type: GET_COMMENTS_PENDING,
});

export const addNextCommentsPage = (commentsPage: number): { type: string, payload: number } => ({
    type: ADD_NEXT_COMMENTS_PAGE,
    payload: commentsPage,
});

export const getMoreCommentsSuccess = (comments: IComments): { type: string, payload: IComments } => ({
    type: GET_MORE_COMMENTS_SUCCESS,
    payload: comments,
});

export const allCommentsLoaded = (): { type: string } => ({
    type: ALL_COMMENTS_LOADED,
});

export const resetComments = (): {type: string} => ({
    type: RESET_COMMENTS,
});

export const getMoreComments = (postId: string, page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getCommentsPending());
            const res = await AuthAPI.get(`comments/${postId}/${page}`);
            if (!res.data.commentsAll.length) {
                dispatch(allCommentsLoaded());
                return;
            }

            dispatch(getMoreCommentsSuccess(res.data.commentsAll));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
