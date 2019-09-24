import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import {
    SET_SUBSCRIBERS_PENDING,
    SET_SUBSCRIBERS,
    SET_SUBSCRIBERS_COUNT,
    ALL_SUBSCRIBERS_LOADED,
    RESET_SUBSCRIBERS,
    CHANGE_USER_FOLLOWING,
} from './actionTypes';

export const setSubscribersPending = (): { type: string } => ({
    type: SET_SUBSCRIBERS_PENDING,
});

export const setSubscribers = (loggedId: string, subscribers: [], page: number):
    { type: string, payload: { loggedId: string, subscribers: [], page: number } } => ({
        type: SET_SUBSCRIBERS,
        payload: {loggedId, subscribers, page},
    });

export const setSubscribersCount = (followersCount: number, followingCount: number):
    { type: string, payload: { followersCount: number, followingCount: number } } => ({
        type: SET_SUBSCRIBERS_COUNT,
        payload: {followersCount, followingCount},
    });

export const allSubscribersLoaded = (): { type: string } => ({
    type: ALL_SUBSCRIBERS_LOADED,
});

export const resetSubscribers = (): { type: string } => ({
    type: RESET_SUBSCRIBERS,
});

export const changeFollowing = (userId: string, followType: string):
    { type: string, payload: {userId: string, followType: string} } => ({
        type: CHANGE_USER_FOLLOWING,
        payload: {userId, followType},
    });

export const getSubscribers = (loggedId: string, subscribers: string, urlUsername: string, page: number):
    (dispatch: Dispatch) => Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setSubscribersPending());
            const res = await AuthAPI.get(`subscribers/${subscribers}/${urlUsername}/${page}`);
            if (!res.data.users.length) {
                dispatch(allSubscribersLoaded());
                return;
            }

            dispatch(setSubscribers(loggedId, res.data.users, page + 1));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const changeUserFollowing = (_id: string, followType: string):
    (dispatch: Dispatch) => Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            followType === 'follow' ? await AuthAPI.post('/following/follow', {_id}) :
            await AuthAPI.put(`/following/unfollow/${_id}`);
            dispatch(changeFollowing(_id, followType));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
