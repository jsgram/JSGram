import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    DELETE_PHOTO_PENDING,
    DELETE_PHOTO_SUCCESS,
    DELETE_PHOTO_ERROR,
    SET_PHOTO_TO_STATE,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { IUserData } from '../../components/Profile';
import { showAlert } from '../alert/actions';

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

export const getUser = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getUserPending());
            // TODO change with pagination
            const res = await AuthAPI.get('/profile/1');
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
