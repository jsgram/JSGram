import {
    SET_AVATAR_TO_CROPPER,
    UPLOAD_AVATAR_PENDING,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_ERROR,
} from './actionTypes';
import { Dispatch } from 'redux';
import { AuthAPI } from '../api';
import { showAlert } from '../alert/actions';
import { setPhotoToState } from '../profile/actions';
import { base64ToFile, createDataForAWS } from '../../helpers/upload.photo';

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

export const informFileIsTooBig = (): (dispatch: Dispatch) => void =>
    (dispatch: Dispatch): void => {
        dispatch(showAlert('File is too big', 'danger'));
    };

export const createFile = (preview: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const newFile = await base64ToFile(preview, 'avatar', 'image/png');
            dispatch(setAvatarToCropper(newFile));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const uploadPostAvatar = (avatar: File): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(uploadAvatarPending());
            const res = await AuthAPI.post('/profile/photo', createDataForAWS(avatar));
            dispatch(showAlert('Successfully uploaded', 'success'));
            dispatch(uploadAvatarSuccess(res.data.userProfile));
            dispatch(setPhotoToState(res.data.photoPath));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
            dispatch(uploadAvatarError(e.response.data));
        }
    };
