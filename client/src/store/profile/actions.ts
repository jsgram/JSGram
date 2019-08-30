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
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { IUserData } from '../../components/Profile';
import { showAlert } from '../alert/actions';
import { IUserSubscriptions } from '../../containers/ProfileSubscriptionsContainer';
import { IUserPrivacy } from '../../containers/ProfilePrivacyContainer';

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
            // TODO change with pagination
            const res = await AuthAPI.get(`/profile/${username}/1`);
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

export const setPhotoToState = (photo: string): {type: string, payload: string} => ({
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

export const changeSettings = (
    username: string,
    subscriptions: IUserSubscriptions,
    privacy: IUserPrivacy,
): (dispatch: Dispatch) =>
    Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(changeSettingsPending());
            const res = await AuthAPI.put(`/profile/${username}/edit-settings`, { subscriptions, privacy });
            dispatch(changeSettingsSuccess(res.data.data));
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(changeSettingsError(e.message));
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
