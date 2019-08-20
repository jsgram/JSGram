import {
    SET_AVATAR_TO_CROPPER,
    UPLOAD_AVATAR_PENDING,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_ERROR,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';

const data = (file: File): FormData => {
    const formData = new FormData();
    formData.append('userPhoto', file);
    formData.append('enctype', 'multipart/form-data');
    return formData;
};

export const setAvatarToCropper = (avatar: any): { type: string, payload: File } => ({
    type: SET_AVATAR_TO_CROPPER,
    payload: avatar,
});

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

export const uploadPostAvatar = (avatar: File): (dispatch: Dispatch) => Promise<string | undefined> =>
    async (dispatch: Dispatch): Promise<string | undefined> => {
        try {
            dispatch(uploadAvatarPending());
            const res = await AuthAPI.post('/profile/photo', data(avatar));
            dispatch(showAlert('Successfully uploaded', 'success'));
            dispatch(uploadAvatarSuccess(res.data.userProfile));
            return res.data.photoPath;
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
            dispatch(uploadAvatarError(e.response.data));
        }
    };

export const uploadPutAvatar = (avatar: File): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.put('/profile/photo', data(avatar));
            dispatch(showAlert('Successfully uploaded', 'success'));
            dispatch(uploadAvatarSuccess(res.data.userProfile));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
