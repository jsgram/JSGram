import { AuthAPI } from '../api';
import { SET_LOGGED_USERNAME } from './actionTypes';
import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';

export const setLoggedUsername = (loggedUsername: string): { type: string, payload: string } => ({
    type: SET_LOGGED_USERNAME,
    payload: loggedUsername,
});

// TODO FIX with feed component
export const getUserInfoFromToken = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.get('/');
            dispatch(setLoggedUsername(res.data.username));
        } catch (e) {
            showAlert(e.response.data.message, 'danger');
        }
    };
