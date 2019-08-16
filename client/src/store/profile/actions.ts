import {GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_ERROR} from './actionTypes';
import {Dispatch} from 'redux';
import axios from 'axios';
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

// TODO Pass jwt to post request
// const jwt = 'jwtjwtjwtjwt';

export const getUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(getUserPending());
            // TODO Change hardcoded URL to real
            const res = await axios.get(('https://reqres.in/api/users/2'));
            dispatch(getUserSuccess(res.data.data));
        } catch (e) {
            dispatch(getUserError(e));
        }

    };