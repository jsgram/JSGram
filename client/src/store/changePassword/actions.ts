import { showAlert } from '../../store/alert/actions';
import { API } from '../api';
import { AuthAPI } from '../api';
import { Dispatch } from 'redux';
import { CHANGE_PASSWORD_PENDING, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR } from './actionTypes';
import { history } from '../../history';

export const changePasswordPending = (): { type: string } => ({
    type: CHANGE_PASSWORD_PENDING,
});

export const changePasswordSuccess = (newPassword: string): { type: string, payload: string } => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: newPassword,
});

export const changePasswordError = (error: Error): { type: string, payload: Error } => ({
    type: CHANGE_PASSWORD_ERROR,
    payload: error,
});

export const changePassword = (password: string, token: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await API.put(`/forgot-password/${token}`, password);
            dispatch(showAlert('You have changed password successfully', 'success'));
            history.push('/login');
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const changeProfilePassword = (
    username: string, oldPassword: string, newPassword: string): (dispatch: Dispatch) =>
    Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(changePasswordPending());
            const res = await AuthAPI.put(`/profile/${username}/edit-password`, { oldPassword, newPassword });
            dispatch(changePasswordSuccess(res.data));
            dispatch(showAlert(res.data.message, 'success'));
        } catch (e) {
            dispatch(changePasswordError(e.message));
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
