import {GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_ERROR} from './actionTypes';
import {Dispatch} from 'redux';
import API from '../api';
import {IUserData} from '../../components/Profile/Profile';
import {IUser} from '../commonInterfaces/commonInterfaces';

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
            dispatch(getUserPending());
            const res = await API.get('/profile');
            dispatch(getUserSuccess(res.data.userProfile));
        } catch (e) {
            dispatch(getUserError(e));
        }

    };
