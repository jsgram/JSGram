import {
    SET_AVATAR_TO_CROPPER,
    SET_CROPPED_IMAGE_FOR_AVATAR,
} from './actionTypes';
import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { RESET_ADD_POST } from '../addPost/actionTypes';

export const setAvatarToCropper = (avatar: File): { type: string, payload: File } => ({
    type: SET_AVATAR_TO_CROPPER,
    payload: avatar,
});

export const setCroppedImageForAvatar = (croppedImage: string): { type: string, payload: string } => ({
    type: SET_CROPPED_IMAGE_FOR_AVATAR,
    payload: croppedImage,
});

export const informFileError = (message: string): (dispatch: Dispatch) => void =>
    (dispatch: Dispatch): void => {
        dispatch(showAlert(message, 'danger'));
    };

export const resetAddPost = (username: string): { type: string, payload: string } => {
    return {
        type: RESET_ADD_POST,
        payload: username,
    };
};
