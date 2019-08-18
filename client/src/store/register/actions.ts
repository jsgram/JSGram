import { showAlert } from '../alert/actions';
import {AuthAPI} from '../api';
import { reset } from 'redux-form';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';

export const registerUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.post('/user', user);
            dispatch(showAlert(res.data.status, 'success'));
            dispatch(reset('registerForm'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
