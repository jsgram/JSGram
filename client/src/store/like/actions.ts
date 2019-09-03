import {
    SET_COUNTS_OF_LIKES,
    CHECK_USER_LIKE_EXIST,

} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';

export const checkUserLikeExist = (likeExist: boolean): { type: string, payload: any} => ({
    type: CHECK_USER_LIKE_EXIST,
    payload: likeExist,
});

export const setCountOfLikes = (countOfLikes: number): { type: string, payload: any} => ({
    type: SET_COUNTS_OF_LIKES,
    payload: countOfLikes,
});

export const addLike = (body: any): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await AuthAPI.post(`likes/like/`, body);
            dispatch(checkUserLikeExist(true));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const deleteLike = (body: any): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const userId = body.userId;
            await AuthAPI.delete(`likes/unlike/${body.postId}`, {data: {userId}});
            dispatch(checkUserLikeExist(false));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
