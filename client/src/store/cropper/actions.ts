import {
    SET_AVATAR_TO_CROPPER,
} from './actionTypes';
import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { base64ToFile } from '../../helpers/upload.photo';

export const setAvatarToCropper = (avatar: File): { type: string, payload: File } => ({
    type: SET_AVATAR_TO_CROPPER,
    payload: avatar,
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
