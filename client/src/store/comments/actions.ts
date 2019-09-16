import {
    GET_COMMENTS_PENDING,
    GET_COMMENTS_SUCCESS,
    ALL_COMMENTS_LOADED,
    RESET_COMMENTS,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { IComments } from './reducers';

export const FIRST_PAGE = 1;

export const getCommentsPending = (): { type: string } => ({
    type: GET_COMMENTS_PENDING,
});

export const allCommentsLoaded = (): { type: string } => ({
    type: ALL_COMMENTS_LOADED,
});

export const getCommentsSuccess = (comments: IComments, page: number):
    { type: string, payload: { comments: IComments, page: number } } => ({
        type: GET_COMMENTS_SUCCESS,
        payload: {comments, page},
    });

export const resetComments = (): { type: string } => ({
    type: RESET_COMMENTS,
});

export const getComments = (postId: string, page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getCommentsPending());
            const res = await AuthAPI.get(`comments/${postId}/${page}`);

            if (!res.data.commentsAll.length) {
                dispatch(allCommentsLoaded());
                return;
            }

            dispatch(getCommentsSuccess(res.data.commentsAll, page));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
