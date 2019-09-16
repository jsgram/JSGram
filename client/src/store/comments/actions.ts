import {
    GET_COMMENTS_PENDING,
    GET_COMMENTS_SUCCESS,
    ALL_COMMENTS_LOADED,
    RESET_COMMENTS,
    ADD_COMMENT_DISPATCH,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { IComments } from './reducers';

export const FIRST_PAGE = 1;

export const getCommentsPending = (): { type: string } => ({
    type: GET_COMMENTS_PENDING,
});

export const allCommentsLoaded = (postId: string, page: number):
    { type: string, payload: { postId: string, page: number } } => ({
        type: ALL_COMMENTS_LOADED,
        payload: {postId, page},
    });

export const getCommentsSuccess = (postId: string, comments: IComments, page: number):
    { type: string, payload: { postId: string, comments: IComments, page: number } } => ({
        type: GET_COMMENTS_SUCCESS,
        payload: {postId, comments, page},
    });

export const resetComments = (): { type: string } => ({
    type: RESET_COMMENTS,
});

export const addCommentDispatch = (res: IComments): { type: string, payload: any } => ({
    type: ADD_COMMENT_DISPATCH,
    payload: res,
});

export const getComments = (postId: string, page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getCommentsPending());
            const res = await AuthAPI.get(`comments/${postId}/${page}`);

            if (!res.data.commentsAll.length) {
                if (page !== FIRST_PAGE) {
                    dispatch(showAlert('All comments loaded', 'warning'));
                }
                dispatch(allCommentsLoaded(postId, page));
                return;
            }

            dispatch(getCommentsSuccess(postId, res.data.commentsAll, page));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
