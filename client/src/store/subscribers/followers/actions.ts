import { Dispatch } from 'redux';
import { showAlert } from '../../alert/actions';
import { AuthAPI } from '../../api';
import {
    SET_FOLLOWERS_PENDING,
    SET_FOLLOWERS,
    SET_NEXT_PAGE,
    SET_MORE_FOLLOWERS,
    ALL_FOLLOWERS_LOADED,
    CHANGE_USER_FOLLOWING,
} from './actionTypes';

export const setFollowersPending = (): { type: string } => ({
    type: SET_FOLLOWERS_PENDING,
});

export const setFollowers = (loggedId: string, followers: []):
    { type: string, payload: {loggedId: string, followers: []} } => ({
        type: SET_FOLLOWERS,
        payload: {loggedId, followers},
    });

export const setNextPage = (page: number): { type: string, payload: number } => ({
    type: SET_NEXT_PAGE,
    payload: page,
});

export const setMoreFollowers = (loggedId: string, followers: [], page: number):
    { type: string, payload: {loggedId: string, followers: [], page: number} } => ({
        type: SET_MORE_FOLLOWERS,
        payload: {loggedId, followers, page},
    });

export const changeUserFollowing = (userId: string): {type: string, payload: string} => ({
    type: CHANGE_USER_FOLLOWING,
    payload: userId,
});

export const allFollowersLoaded = (): { type: string } => ({
    type: ALL_FOLLOWERS_LOADED,
});

export const getFollowers = (loggedId: string, urlUsername: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setFollowersPending());
            const res = await AuthAPI.get(`subscribers/followers/${urlUsername}/1`);
            dispatch(setFollowers(loggedId, res.data.users));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getMoreFollowers = (loggedId: string, urlUsername: string, page: number):
    (dispatch: Dispatch) => Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setFollowersPending());
            const res = await AuthAPI.get(`subscribers/followers/${urlUsername}/${page}`);
            if (!res.data.users.length) {
                dispatch(allFollowersLoaded());
                return;
            }

            dispatch(setMoreFollowers(loggedId, res.data.users, page));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
