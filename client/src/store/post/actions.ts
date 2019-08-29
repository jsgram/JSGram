import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import {
    ALL_POSTS_LOADED,
    GET_MORE_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
} from './actionTypes';
import { store } from '../../App';
import { IPost } from './reducers';

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

export const getPostsError = (error: Error): { type: string, payload: Error } => ({
    type: GET_POSTS_ERROR,
    payload: error,
});

export const allPostsLoaded = (): { type: string, payload: boolean } => ({
    type: ALL_POSTS_LOADED,
    payload: true,
});

export const getPostsAsync = (username: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {

            const res = await AuthAPI.get(`/profile/${username}/posts/1`);
            dispatch(getPostsPending());

            dispatch(getPostsSuccess(res.data.postsAll));
        } catch (e) {
            dispatch(getPostsError(e));
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getMorePostsAsync = (username: string, page: number): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            if (store.getState().posts.loaded) {
                return;
            }
            const res = await AuthAPI.get(`/profile/${username}/posts/${page}`);
            dispatch(getPostsPending());

            if (!res.data.postsAll.length) {
                dispatch(allPostsLoaded());
                return;
            }

            dispatch(getMorePostsSuccess(res.data.postsAll));
        } catch (e) {
            dispatch(getPostsError(e));
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
