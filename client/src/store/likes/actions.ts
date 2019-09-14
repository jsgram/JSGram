import {
    SET_AUTHORS_OF_LIKES,
    CHECK_LOGGED_USER_LIKE_EXIST,
    ADD_USER_LIKE,
    REMOVE_USER_LIKE,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { addUserLikeToSelectedPost, removeUserLikeFromSelectedPost } from '../post/actions';

interface IBody {
    userId: string;
    postId: string;
}

export const setAuthorsOfLike = (authorsOfLike: []): { type: string, payload: [] } => ({
    type: SET_AUTHORS_OF_LIKES,
    payload: authorsOfLike,
});

export const setUserLikeExist = (loggedUserLikeExist: boolean): { type: string, payload: boolean } => ({
    type: CHECK_LOGGED_USER_LIKE_EXIST,
    payload: loggedUserLikeExist,
});

export const addLoggedUserLike = (loggedUserId: string): { type: string, payload: string } => ({
    type: ADD_USER_LIKE,
    payload: loggedUserId,
});

export const removeLoggedUserLike = (loggedUserId: string): { type: string, payload: string } => ({
    type: REMOVE_USER_LIKE,
    payload: loggedUserId,
});

export const addLike = (body: IBody): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await AuthAPI.post(`likes/like`, body);
            dispatch(addLoggedUserLike(body.userId));
            dispatch(addUserLikeToSelectedPost(body.userId, body.postId));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const deleteLike = (body: IBody): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const {userId, postId}: IBody = body;
            await AuthAPI.delete(`likes/unlike/${postId}`, {data: {userId}});
            dispatch(removeLoggedUserLike(userId));
            dispatch(removeUserLikeFromSelectedPost(userId, postId));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
