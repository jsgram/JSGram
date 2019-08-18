import {AuthAPI} from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';
import {setToken} from './setToken.helper';

export const loginUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.post('/auth/login', user);
            if (res.status === 200) {
                dispatch(showAlert('Welcome', 'success'));
            }
            setToken(res.data.token);
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
