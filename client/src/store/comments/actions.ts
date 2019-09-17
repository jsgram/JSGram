import {
    GET_COMMENTS_PENDING,
    GET_COMMENTS_SUCCESS,
    ALL_COMMENTS_LOADED,
    RESET_COMMENTS,
    EDIT_COMMENT,
    CHANGE_COMMENT,
    CHANGE_EDIT_STATUS_COMMENT,
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

export const getComments = (postId: string, commentState: any, commentsLoaded?: boolean): (dispatch: Dispatch) =>
    Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getCommentsPending());
            const page = typeof commentState === 'number' ? commentState :
                commentState[0] ? commentState[0].page : false;

            const res = await AuthAPI.get(`comments/${postId}/${page || 1}`);

            if (!res.data.commentsAll.length || commentsLoaded || !page ) {
                if (page !== FIRST_PAGE) {
                    dispatch(showAlert('All comments loaded', 'warning'));
                }
                dispatch(allCommentsLoaded(postId, page));
                return;
            }

            dispatch(getCommentsSuccess(postId, res.data.commentsAll, page + 1));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

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
