import {
    SET_POST_AUTHORS_OF_LIKES,
    SET_FEED_AUTHORS_OF_LIKES,
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

export const setPostAuthorsOfLike = (authorsOfLike: []): { type: string, payload: [] } => ({
    type: SET_POST_AUTHORS_OF_LIKES,
    payload: authorsOfLike,
});

export const setFeedAuthorsOfLike = (postId: string, authorsOfLike: [], userLikeExist: boolean):
    { type: string, payload: { postId: string, authorsOfLike: [], userLikeExist: boolean } } => ({
        type: SET_FEED_AUTHORS_OF_LIKES,
        payload: {postId, authorsOfLike, userLikeExist},
    });

export const setUserLikeExist = (loggedUserLikeExist: boolean): { type: string, payload: boolean } => ({
    type: CHECK_LOGGED_USER_LIKE_EXIST,
    payload: loggedUserLikeExist,
});

export const addUserLike = (userId: string, postId: string):
    { type: string, payload: {userId: string, postId: string} } => ({
        type: ADD_USER_LIKE,
        payload: {userId, postId},
    });

export const removeUserLike = (userId: string, postId: string):
    { type: string, payload: {userId: string, postId: string} } => ({
        type: REMOVE_USER_LIKE,
        payload: {userId, postId},
    });

export const addLike = (body: IBody): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await AuthAPI.post(`likes/like`, body);
            dispatch(addUserLike(body.userId, body.postId));
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
            dispatch(removeUserLike(body.userId, body.postId));
            dispatch(removeUserLikeFromSelectedPost(userId, postId));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
