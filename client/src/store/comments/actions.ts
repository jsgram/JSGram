import {
    GET_COMMENTS_PENDING,
    GET_COMMENTS_SUCCESS,
    ALL_COMMENTS_LOADED,
    RESET_COMMENTS,
    EDIT_COMMENT,
    CHANGE_COMMENT,
    SET_DEFAULT_COMMENT_ON_CHANGE,
    ON_CHANGE_COMMENT,
    ADD_COMMENT,
    CHANGE_EDIT_STATUS_COMMENT,
    DELETE_COMMENT,
    RESET_COMMENT,
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
    payload: { postId, page },
});

export const getCommentsSuccess = (postId: string, comments: IComments, page: number):
{ type: string, payload: { postId: string, comments: IComments, page: number } } => ({
    type: GET_COMMENTS_SUCCESS,
    payload: { postId, comments, page },
});

export const resetComments = (): { type: string } => ({
    type: RESET_COMMENTS,
});

export const setDefaultCommentToChange = (postId: string): { type: string, payload: string } => ({
    type: SET_DEFAULT_COMMENT_ON_CHANGE,
    payload: postId,
});

export const onChangeComment = (postId: string, comment: string):
{ type: string, payload: { postId: string, comment: string } } => ({
    type: ON_CHANGE_COMMENT,
    payload: { postId, comment },
});

export const addNewComment = (newComment: IComments): { type: string, payload: any } => ({
    type: ADD_COMMENT,
    payload: newComment,
});

export const deleteCommentSuccess = (commentId: string): { type: string, payload: string } => ({
    type: DELETE_COMMENT,
    payload: commentId,
});

export const resetComment = (postId: string): { type: string, payload: string } => ({
    type: RESET_COMMENT,
    payload: postId,
});

export const getComments = (postId: string, commentState: any, commentsLoaded?: boolean): (dispatch: Dispatch) =>
    Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getCommentsPending());
            const page = typeof commentState === 'number' ? commentState :
                commentState[0] ? commentState[0].page : false;

            const res = await AuthAPI.get(`comments/${postId}/${page || 1}`);

            if (!res.data.commentsAll.length || res.data.commentsAll.length % 10 !== 0 || commentsLoaded || !page ) {
                dispatch(getCommentsSuccess(postId, res.data.commentsAll, page));
                dispatch(allCommentsLoaded(postId, page));
                return;
            }

            dispatch(getCommentsSuccess(postId, res.data.commentsAll, page + 1));
        } catch (e) {
            dispatch(showAlert(e, 'danger'));
        }
    };

export const addComment = (postId: string, authorId: string, comment: string): (dispatch: Dispatch) =>
    Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.post(`/comments`, { postId, authorId, comment });
            dispatch(addNewComment(res.data.createdComment));
            dispatch(resetComment(postId));
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const deleteComment = (commentId: string, authorId: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.delete(`/comments/${commentId}`, { data: { authorId } });
            dispatch(deleteCommentSuccess(commentId));
            dispatch(showAlert(res.data.message, 'success'));
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
): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.patch(`/comments/${commentId}`, { comment });
            dispatch(editComment(comment, commentId));
            dispatch(showAlert(res.data.message, 'success'));
            dispatch(changeEditStatus(commentId));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
