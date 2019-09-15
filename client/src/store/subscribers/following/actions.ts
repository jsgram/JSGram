import { Dispatch } from 'redux';
import { showAlert } from '../../alert/actions';
import { AuthAPI } from '../../api';
import {
    SET_FOLLOWING_PENDING,
    SET_FOLLOWING,
    SET_NEXT_PAGE,
    SET_MORE_FOLLOWING,
    ALL_FOLLOWING_LOADED,
} from './actionTypes';

export const setFollowingPending = (): { type: string } => ({
    type: SET_FOLLOWING_PENDING,
});

export const setFollowing = (loggedId: string, following: []):
    { type: string, payload: {loggedId: string, following: []} } => ({
        type: SET_FOLLOWING,
        payload: {loggedId, following},
    });

export const setNextPage = (page: number): { type: string, payload: number } => ({
    type: SET_NEXT_PAGE,
    payload: page,
});

export const setMoreFollowing = (loggedId: string, following: []):
    { type: string, payload: {loggedId: string, following: []} } => ({
        type: SET_MORE_FOLLOWING,
        payload: {loggedId, following},
    });

export const allFollowingLoaded = (): { type: string } => ({
    type: ALL_FOLLOWING_LOADED,
});

export const getFollowing = (loggedId: string, urlUsername: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setFollowingPending());
            const res = await AuthAPI.get(`subscribers/following/${urlUsername}/1`);
            dispatch(setFollowing(loggedId, res.data.users));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const getMoreFollowings = (loggedId: string, urlUsername: string, page: number):
    (dispatch: Dispatch) => Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setFollowingPending());
            const res = await AuthAPI.get(`subscribers/following/${urlUsername}/${page}`);
            if (!res.data.users.length) {
                dispatch(allFollowingLoaded());
                return;
            }

            dispatch(setMoreFollowing(loggedId, res.data.users));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
