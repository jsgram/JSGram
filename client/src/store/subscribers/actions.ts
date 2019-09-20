import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import {
    SET_SUBSCRIBERS_PENDING,
    SET_SUBSCRIBERS,
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

export const allSubscribersLoaded = (): { type: string } => ({
    type: ALL_SUBSCRIBERS_LOADED,
});

export const resetSubscribers = (): { type: string } => ({
    type: RESET_SUBSCRIBERS,
});

export const changeUserFollowing = (userId: string): { type: string, payload: string } => ({
    type: CHANGE_USER_FOLLOWING,
    payload: userId,
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
