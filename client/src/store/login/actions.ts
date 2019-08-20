import { API } from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';
import { setToken } from './setToken.helper';
import { GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_ERROR } from '../profile/actionTypes';
import { IUserData } from '../../components/Profile/Profile';
import { TOKEN } from '../login/setToken.helper';

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

export const loginUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.post('/auth/login', user);
            if (res.status === 200) {
                dispatch(showAlert('Welcome', 'success'));
            }
            setToken(res.data.token);
            dispatch(getUserPending());
            const token = localStorage.getItem(TOKEN);
            const get = await API.get(('/'), {
                headers: {Authorization: token},
            });

            dispatch(getUserSuccess(get.data));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
