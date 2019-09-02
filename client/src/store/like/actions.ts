import {
    SET_COUNTS_OF_LIKES,

} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';

export const setCountOfLikes = (countOfLikes: number): { type: string, payload: any} => ({
    type: SET_COUNTS_OF_LIKES,
    payload: countOfLikes,
});

export const addLike = (body: any): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.post(`likes/like/`, body);
            console.log(res);
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const deleteLike = (body: any): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const userId = body.userId;
            const res = await AuthAPI.delete(`likes/unlike/${body.postId}`, {data: {userId}});
            console.log(res);
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
