import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import {
    ALL_POSTS_LOADED, CLEAR_LOADED,
    GET_MORE_POSTS_SUCCESS,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
} from './actionTypes';
import { store } from '../../App';
import { IPost } from './reducers';

export const getPostsPending = (): { type: string, loading: boolean } => ({
    type: GET_POSTS_PENDING,
    loading: true,
});

export const getPostsSuccess = (posts: IPost): { type: string, payload: any, loading: boolean } => ({
    type: GET_POSTS_SUCCESS,
    payload: posts,
    loading: false,
});

export const getMorePostsSuccess = (posts: any): { type: string, payload: any, loading: boolean } => ({
    type: GET_MORE_POSTS_SUCCESS,
    payload: posts,
    loading: false,
});

export const allPostsLoaded = (): { type: string, payload: boolean } => ({
    type: ALL_POSTS_LOADED,
    payload: true,
});

export const clearLoaded = (): { type: string } => ({
    type: CLEAR_LOADED,
});

export const getPostsAsync = (username: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {

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
            if (store.getState().posts.loaded) {
                return;
            }
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
