import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    DELETE_PHOTO_PENDING,
    DELETE_PHOTO_SUCCESS,
    DELETE_PHOTO_ERROR,
    SET_PHOTO_TO_STATE,
    CHANGE_SETTINGS_PENDING,
    CHANGE_SETTINGS_SUCCESS,
    CHANGE_SETTINGS_ERROR,
    DECREMENT_POST_COUNT,
    UPLOAD_AVATAR_PENDING,
    UPLOAD_AVATAR_ERROR,
    UPLOAD_AVATAR_SUCCESS, FOLLOW_USER, UNFOLLOW_USER, FOLLOW_USER_PENDING, FOLLOW_USER_SUCCESS,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { IUserData } from '../../components/Profile';
import { showAlert } from '../alert/actions';
import { IUserSubscriptions } from '../../containers/ProfileSubscriptionsContainer';
import { IUserPrivacy } from '../../containers/ProfilePrivacyContainer';
import { createDataForAWS } from '../../helpers/upload.photo';

export const getUserPending = (): { type: string } => ({
    type: GET_USER_PENDING,
});

export const getUserSuccess = (user: IUserData): { type: string, payload: any } => ({
    type: GET_USER_SUCCESS,
    payload: user,
});

export const getUserError = (error: Error): { type: string, payload: Error } => ({
    type: GET_USER_ERROR,
    payload: error,
});

export const getUser = (username: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getUserPending());
            const res = await AuthAPI.get(`/profile/${username}`);
            dispatch(getUserSuccess(res.data.userProfile));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
            dispatch(getUserError(e));
        }
    };

export const deletePhotoPending = (): { type: string } => ({
    type: DELETE_PHOTO_PENDING,
});

export const deletePhotoSuccess = (photoPath: string): { type: string, payload: string } => ({
    type: DELETE_PHOTO_SUCCESS,
    payload: photoPath,
});

export const deletePhotoError = (error: Error): { type: string, payload: Error } => ({
    type: DELETE_PHOTO_ERROR,
    payload: error,
});

export const deletePhoto = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(deletePhotoPending());
            const res = await AuthAPI.delete('/profile/photo');
            dispatch(deletePhotoSuccess(res.data.photoPath));
            dispatch(showAlert(res.data.status, 'success'));
        } catch (e) {
            dispatch(deletePhotoError(e.message));
        }
    };

export const uploadAvatarPending = (): { type: string } => ({
    type: UPLOAD_AVATAR_PENDING,
});

export const uploadAvatarSuccess = (avatar: any): { type: string, payload: File } => ({
    type: UPLOAD_AVATAR_SUCCESS,
    payload: avatar,
});

export const uploadAvatarError = (error: Error): { type: string, payload: Error } => ({
    type: UPLOAD_AVATAR_ERROR,
    payload: error,
});

export const setPhotoToState = (photo: string): { type: string, payload: string } => ({
    type: SET_PHOTO_TO_STATE,
    payload: photo,
});

export const changeSettingsPending = (): { type: string } => ({
    type: CHANGE_SETTINGS_PENDING,
});

export const changeSettingsSuccess = (newSettings: any): { type: string, payload: any } => ({
    type: CHANGE_SETTINGS_SUCCESS,
    payload: newSettings,
});

export const changeSettingsError = (error: Error): { type: string, payload: Error } => ({
    type: CHANGE_SETTINGS_ERROR,
    payload: error,
});

export const decrementPostCount = (): { type: string } => ({
    type: DECREMENT_POST_COUNT,
});

export const changeSettings = (
    username: string,
    subscriptions: IUserSubscriptions,
    privacy: IUserPrivacy,
): (dispatch: Dispatch) =>
    Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(changeSettingsPending());
            const res = await AuthAPI.put(`/profile/${username}/edit-settings`, {subscriptions, privacy});
            dispatch(changeSettingsSuccess(res.data.data));
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(changeSettingsError(e.message));
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const uploadPostAvatar = (avatar: File): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(uploadAvatarPending());
            const res = await AuthAPI.post('/profile/photo', createDataForAWS('userPhoto', avatar));
            dispatch(showAlert('Successfully uploaded', 'success'));
            dispatch(uploadAvatarSuccess(res.data.userProfile));
            dispatch(setPhotoToState(res.data.photoPath));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
            dispatch(uploadAvatarError(e.response.data));
        }
    };

export const addFollowUser = (loggedId: string, urlUserFollowers: []):
    { type: string, payload: { loggedId: string, urlUserFollowers: [] } } => ({
        type: FOLLOW_USER,
        payload: {loggedId, urlUserFollowers},
    });

export const followUserPending = (): {type: string} => ({
    type: FOLLOW_USER_PENDING,
});

export const followUserSuccess = (): {type: string} => ({
    type: FOLLOW_USER_SUCCESS,
});

export const removeFollowUser = (loggedId: string, urlUserFollowers: []):
    { type: string, payload: { loggedId: string, urlUserFollowers: [] } } => ({
        type: UNFOLLOW_USER,
        payload: {loggedId, urlUserFollowers},
    });

export const followUser = (body: {_id: string}): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(followUserPending());
            const res = await AuthAPI.post('/following/follow', body);
            dispatch(addFollowUser(res.data.updatedLoggedUser._id, res.data.updatedFollowingUserId.followers));
            dispatch(followUserSuccess());
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const unfollowUser = (body: {_id: string}): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(followUserPending());
            const res = await AuthAPI.put(`/following/unfollow/${body._id}`);
            dispatch(removeFollowUser(res.data.updatedLoggedUser._id, res.data.updatedFollowingUserId.followers));
            dispatch(followUserSuccess());
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
