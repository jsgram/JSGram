import {
    SET_AVATAR_TO_CROPPER,
    UPLOAD_AVATAR_PENDING,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_ERROR,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';

export const setAvatarToCropper = (avatar: any): {type: string, payload: File} => ({
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

export const uploadAvatar = (avatar: File): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const data = new FormData();
            data.append('userPhoto', avatar);
            data.append('enctype', 'multipart/form-data');
            const res = await AuthAPI.post('/profile/photo', data);
            if (res.status === 200) {
                dispatch(showAlert('Successfully uploaded', 'success'));
            }
            dispatch(uploadAvatarSuccess(res.data.userProfile));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
