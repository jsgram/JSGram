import {
    GET_COMMENTS_PENDING,
    GET_COMMENTS_SUCCESS,
    ALL_COMMENTS_LOADED,
    RESET_COMMENTS,
    EDIT_COMMENT,
    CHANGE_COMMENT,
    CHANGE_EDIT_STATUS_COMMENT,
    ADD_COMMENT_DISPATCH,
    DELETE_COMMENT,
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

export const addCommentDispatch = (res: IComments): { type: string, payload: any } => ({
    type: ADD_COMMENT_DISPATCH,
    payload: res,
});

export const deleteCommentSuccess = (commentId: string): { type: string, payload: string } => ({
    type: DELETE_COMMENT,
    payload: commentId,
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

export const deleteComment = (commentId: string, authorId: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.delete(`/comments/${commentId}`, { data: {authorId} });
            dispatch(deleteCommentSuccess(commentId));
            dispatch(showAlert(res.data.message, 'success'));

export const editComment = (comment: string, commentId: string)
    : { type: string, payload: any } => (
    {
        type: EDIT_COMMENT,
        payload: {
            comment,
            commentId,
        },
    });

export const changeComment = (comment: string, commentId: string)
    : { type: string, payload: any } => (
    {
        type: CHANGE_COMMENT,
        payload: {
            comment,
            commentId,
        },
    });

export const changeEditStatus = (commentId: string): { type: string, payload: string } => ({
    type: CHANGE_EDIT_STATUS_COMMENT,
    payload: commentId,
});

export const editCommentAsync = (
    comment: string,
    commentId: string,
    email: string,
): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.patch(`/comments/${commentId}`, {comment, email});
            dispatch(editComment(comment, commentId));
            dispatch(showAlert(res.data.message, 'success'));
            dispatch(changeEditStatus(commentId));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
