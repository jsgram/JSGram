import {
    ADD_LIKE,
    GET_LIKE,
    DELETE_LIKE,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { IPost } from '../post/reducers';
import { showAlert } from '../alert/actions';

export const getLike = (likes: IPost): { type: string, payload: any} => ({
    type: GET_LIKE,
    payload: likes,
});

export const addLike = (body: any): { type: string, payload: boolean } => ({
    type: ADD_LIKE,
    payload: body,
});

export const deleteLike = (body: any): { type: string, payload: boolean } => ({
    type: DELETE_LIKE,
    payload: body,
});

export const deleteLikeAsync = (body: any): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.delete(`likes/unlike/${body.postId}`, body.userId);
            console.log(res);
            //dispatch(deleteLike(res.data));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const addLikeAsync = (body: any): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.post(`likes/like/`, body);
            console.log(res);
            dispatch(addLike(res.data));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
