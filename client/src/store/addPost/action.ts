import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { base64ToFile, createDataForAWS } from '../../helpers/upload.photo';
import { AuthAPI } from '../api';
import { history } from '../../history';
import { RESET_ADD_POST, SET_CROPPED_IMAGE_FOR_POST, SET_DESCRIPTION_FOR_POST } from './actionTypes';

export const setCroppedImageForPost = (croppedImage: string): { type: string, payload: any } => ({
    type: SET_CROPPED_IMAGE_FOR_POST,
    payload: croppedImage,
});

export const setDescriptionForPost = (description: string): { type: string, payload: any } => ({
    type: SET_DESCRIPTION_FOR_POST,
    payload: description,
});

export const resetAddPost = (): { type: string, payload: any } => ({
    type: RESET_ADD_POST,
    payload: '',
});

export const uploadPost = (croppedImage: string, description: string, resetState: () => void):
    (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const newFile = await base64ToFile(croppedImage, 'post', 'image/png');
            await AuthAPI.post('/post', createDataForAWS('postImage', newFile, description));
            history.push('/profile');
            resetState();
            dispatch(showAlert('Successfully uploaded', 'success'));
        } catch (e) {
            showAlert(e.response.data.message, 'danger');
        }
    };
