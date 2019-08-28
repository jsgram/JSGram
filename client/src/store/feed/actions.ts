import { AuthAPI } from '../api';
import { SET_USERNAME } from './actionTypes';
import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';

export const setUsername = (username: string): { type: string, payload: string } => ({
    type: SET_USERNAME,
    payload: username,
});

export const getUserInfoFromToken = (): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.get('/');
            dispatch(setUsername(res.data.username));
        } catch (e) {
            showAlert(e.response.data.message, 'danger');
        }
    };
