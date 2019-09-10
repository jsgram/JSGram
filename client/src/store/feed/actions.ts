import { AuthAPI } from '../api';
import { SET_LOGGED_USERNAME } from './actionTypes';
import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';

export const setLoggedUsername = (loggedId: string, loggedUsername: string):
    { type: string, payload: { loggedId: string, loggedUsername: string } } => ({
        type: SET_LOGGED_USERNAME,
        payload: {loggedId, loggedUsername},
    });

// TODO FIX with feed component
export const getUserInfoFromToken = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.get('/');
            dispatch(setLoggedUsername(res.data._id, res.data.username));
        } catch (e) {
            showAlert(e.response.data.message, 'danger');
        }
    };
