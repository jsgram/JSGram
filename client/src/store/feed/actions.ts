import { AuthAPI } from '../api';
import { SET_LOGGED_USERNAME } from './actionTypes';
import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';

export const setLoggedUsername = (loggedId: string, loggedUsername: string, loggedPhotoPath: string, isAdmin: boolean):
    {
        type: string,
        payload: {
            loggedId: string,
            loggedUsername: string,
            loggedPhotoPath: string,
            isAdmin: boolean,
        } } => ({
            type: SET_LOGGED_USERNAME,
            payload: {
                loggedId,
                loggedUsername,
                loggedPhotoPath,
                isAdmin,
            },
        });

export const getUserInfoFromToken = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.get('/');
            dispatch(setLoggedUsername(res.data._id, res.data.username, res.data.photoPath, res.data.isAdmin));
        } catch (e) {
            showAlert(e.response.data.message, 'danger');
        }
    };
