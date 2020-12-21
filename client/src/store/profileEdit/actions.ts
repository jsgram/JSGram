import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';
import { AuthAPI } from '../api';
import {
    SET_NEW_FULLNAME,
    SET_NEW_USERNAME,
} from './actionTypes';
import { setLoggedUsername } from '../feed/actions';

export const setUsername = (newUsername: string): { type: string, payload: string } => ({
    type: SET_NEW_USERNAME,
    payload: newUsername,
});

export const setFullName = (fullName: string): { type: string, payload: string } => ({
    type: SET_NEW_FULLNAME,
    payload: fullName,
});

export const editProfile = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {

            const res = await AuthAPI.post('/profile/edit/', {user});

            const {
                _id,
                username,
                photoPath,
                isAdmin,
            }: {
                _id: string,
                username: string,
                photoPath: string,
                isAdmin: boolean,
            } = res.data.updatedUser;

            if (user.fullName) {
                dispatch(setFullName(user.fullName));
            }
            dispatch(setUsername(username));
            dispatch(setLoggedUsername(_id, username, photoPath, isAdmin));
            dispatch(showAlert(res.data.status, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
