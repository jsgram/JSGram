import {API} from '../api';
import axios from 'axios';
import {showAlert} from '../alert/actions';
import {Dispatch} from 'redux';
import {GET_POSTS_ERROR, GET_POSTS_PENDING, GET_POSTS_SUCCESS} from './actionTypes';

export const getPostsPending = (): { type: string } => ({
    type: GET_POSTS_PENDING,
});

// FIXME Remove any
export const getPostsSuccess = (posts: any): { type: string, payload: any } => ({
    type: GET_POSTS_SUCCESS,
    payload: posts,
});

export const getPostsError = (error: Error): { type: string, payload: Error } => ({
    type: GET_POSTS_ERROR,
    payload: error,
});

export const getPostsAsync = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await axios.get('https://reqres.in/api/users');
            dispatch(getPostsPending());

            dispatch(getPostsSuccess(res.data.data));
        } catch (e) {
            dispatch(getPostsError(e));
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
