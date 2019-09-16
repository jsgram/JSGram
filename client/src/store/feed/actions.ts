import { AuthAPI } from '../api';
import { SET_LOGGED_USERNAME } from './actionTypes';
import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';

export const setLoggedUsername = (loggedId: string, loggedUsername: string, loggedPhotoPath: string):
    { type: string, payload: { loggedId: string, loggedUsername: string, loggedPhotoPath: string } } => ({
        type: SET_LOGGED_USERNAME,
        payload: {loggedId, loggedUsername, loggedPhotoPath},
    });

export const getUserInfoFromToken = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.get('/');
            dispatch(setLoggedUsername(res.data._id, res.data.username, res.data.photoPath));
        } catch (e) {
            showAlert(e.response.data.message, 'danger');
        }
    };
