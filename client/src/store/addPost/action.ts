import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { base64ToFile, createDataForAWS } from '../../helpers/upload.photo';
import { AuthAPI } from '../api';
import { history } from '../../history';
import {
    GET_POST_ERROR,
    GET_POST_PENDING,
    GET_POST_SUCCESS,
    RESET_ADD_POST,
    SET_CROPPED_IMAGE_FOR_POST,
    SET_DESCRIPTION_FOR_POST,
} from './actionTypes';
import { IUserData } from '../../components/Profile';

export const getPostPending = (): { type: string } => ({
    type: GET_POST_PENDING,
});

export const getPostSuccess = (post: IUserData): { type: string, payload: IUserData } => ({
    type: GET_POST_SUCCESS,
    payload: post,
});

export const getPostError = (error: Error): { type: string, payload: Error } => ({
    type: GET_POST_ERROR,
    payload: error,
});

export const setCroppedImageForPost = (croppedImage: string): { type: string, payload: string } => ({
    type: SET_CROPPED_IMAGE_FOR_POST,
    payload: croppedImage,
});

export const setDescriptionForPost = (description: string): { type: string, payload: string } => ({
    type: SET_DESCRIPTION_FOR_POST,
    payload: description,
});

export const resetAddPost = (): { type: string } => {
    return {
        type: RESET_ADD_POST,
    };
};

export const informFileError = (message: string): (dispatch: Dispatch) => void =>
    (dispatch: Dispatch): void => {
        dispatch(showAlert(message, 'danger'));
    };

export const uploadPost = (croppedImage: string, description: string, username: string):
    (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getPostPending());
            const newFile = await base64ToFile(croppedImage, 'post', 'image/png');
            const res = await AuthAPI.post('/post', createDataForAWS('postImage', newFile, description));
            dispatch(getPostSuccess(res.data));
            dispatch(resetAddPost());
            history.push(`profile/${username}`);
            dispatch(showAlert('Successfully uploaded', 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
            dispatch(getPostError(e));
        }
    };
