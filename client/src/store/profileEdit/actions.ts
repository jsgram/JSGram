import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';
import {AuthAPI} from '../api';
import { SET_NEW_USERNAME } from './actionTypes';

export const setUsername = (newUsername: string): {type: string, payload: string} => ({
    type: SET_NEW_USERNAME,
    payload: newUsername,
});

export const editProfile = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.post('/profile/edit/', {user});
            dispatch(setUsername(res.data.updatedUser.username));
            dispatch(showAlert(res.data.status, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
