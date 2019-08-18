import {GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_ERROR} from './actionTypes';
import {Dispatch} from 'redux';
import API from '../api';
import {IUserData} from '../../components/Profile/Profile';
import {IUser} from '../commonInterfaces/commonInterfaces';
import {TOKEN} from '../login/setToken.helper';

export const getUserPending = (): { type: string } => ({
    type: GET_USER_PENDING,
});

export const getUserSuccess = (user: IUserData): { type: string, payload: any } => ({
    type: GET_USER_SUCCESS,
    payload: user,
});

export const getUserError = (error: Error): { type: string, payload: Error } => ({
    type: GET_USER_ERROR,
    payload: error,
});

export const getUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const token = localStorage.getItem(TOKEN);
            dispatch(getUserPending());
            const res = await API.get(('http://localhost:8080/profile/'), {
                headers: { Authorization: token },
            });
            dispatch(getUserSuccess(res.data.userProfile));
        } catch (e) {
            dispatch(getUserError(e));
        }

    };
