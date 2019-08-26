import { SET_EMAIL_TEXT } from './actionTypes';
import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { AuthAPI } from '../api';
import { IUser } from '../commonInterfaces/commonInterfaces';

export const setEmailText = (email: string): { type: string, payload: string } => ({
    type: SET_EMAIL_TEXT,
    payload: email,
});

export const changeEmail = (profileUser: IUser, newEmail: string): (dispatch: Dispatch) =>
    Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.post('/profile/changeEmail/', {profileUser, newEmail});
            dispatch(showAlert(res.data.status, 'success'));
        } catch (e) {
            dispatch(showAlert('error', 'danger'));
        }
    };
