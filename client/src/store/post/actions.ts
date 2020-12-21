import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import {
    ALL_POSTS_LOADED, CLEAR_LOADED,
    GET_MORE_POSTS_SUCCESS,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    DELETE_POST_PENDING,
    DELETE_POST_SUCCESS,
    EDIT_DESCRIPTION_FOR_POST,
    SHOW_SELECTED_POST, RESET_POSTS,
    UPLOAD_NEXT_POSTS,
    ADD_USER_LIKE_TO_SELECTED_POST,
    REMOVE_USER_LIKE_FROM_SELECTED_POST,
    NEW_DESCRIPTION_FOR_POST,
    CHANGE_EDIT_STATUS_POST,
} from './actionTypes';
import { IPost } from './reducers';
import { decrementPostCount } from '../profile/actions';

export const getPostsPending = (): { type: string } => ({
    type: GET_POSTS_PENDING,
});

export const getPostsSuccess = (posts: IPost): { type: string, payload: any } => ({
    type: GET_POSTS_SUCCESS,
    payload: posts,
});

export const getMorePostsSuccess = (posts: any): { type: string, payload: any } => ({
    type: GET_MORE_POSTS_SUCCESS,
    payload: posts,
});

export const allPostsLoaded = (): { type: string } => ({
    type: ALL_POSTS_LOADED,
});

export const clearLoaded = (): { type: string } => ({
    type: CLEAR_LOADED,
});

export const deletePostPending = (): { type: string } => ({
    type: DELETE_POST_PENDING,
});

export const deletePostSuccess = (postId: string): { type: string, payload: string } => ({
    type: DELETE_POST_SUCCESS,
    payload: postId,
});

export const showPost = (post: any): { type: string, payload: any } => ({
    type: SHOW_SELECTED_POST,
    payload: post,
});

export const newDescriptionForPost = (description: string, postId: string):
{ type: string, payload: { description: string, postId: string } } => ({
    type: NEW_DESCRIPTION_FOR_POST,
    payload: { description, postId },
});

export const editDescriptionForPost = (description: string, postId: string):
{ type: string, payload: { description: string, postId: string } } => ({
    type: EDIT_DESCRIPTION_FOR_POST,
    payload: { description, postId },
});

export const addNextPosts = (page: number): { type: string, payload: number } => ({
    type: UPLOAD_NEXT_POSTS,
    payload: page,
});

export const resetPosts = (): { type: string } => ({
    type: RESET_POSTS,
});

export const addUserLikeToSelectedPost = (loggedId: string, postId: string):
{ type: string, payload: { loggedId: string, postId: string } } => ({
    type: ADD_USER_LIKE_TO_SELECTED_POST,
    payload: { loggedId, postId },
});

export const removeUserLikeFromSelectedPost = (loggedId: string, postId: string): { type: string, payload: any } => ({
    type: REMOVE_USER_LIKE_FROM_SELECTED_POST,
    payload: { loggedId, postId },
});

export const changeEditStatus = (postId: string): { type: string, payload: string } => ({
    type: CHANGE_EDIT_STATUS_POST,
    payload: postId,
});

export const getPostsAsync = (username: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(resetPosts());
            dispatch(getPostsPending());
            const res = await AuthAPI.get(`/profile/${username}/posts/1`);

            dispatch(getPostsSuccess(res.data.postsAll));
            dispatch(clearLoaded());
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getMorePostsAsync = (username: string, page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getPostsPending());
            const res = await AuthAPI.get(`/profile/${username}/posts/${page}`);
            if (!res.data.postsAll.length) {
                dispatch(allPostsLoaded());
                return;
            }

            dispatch(getMorePostsSuccess(res.data.postsAll));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const deletePost = (postId: string, authorId: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(deletePostPending());
            const res = await AuthAPI.delete(`/post/${postId}`, {data: {authorId}});
            dispatch(deletePostSuccess(postId));
            dispatch(decrementPostCount());
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const editPost = (description: string, id: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.patch(`/post/${id}`, JSON.stringify({ description }));
            dispatch(editDescriptionForPost(description, id));
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
