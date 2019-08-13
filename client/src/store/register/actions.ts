import { showAlert } from '../../store/alert/actions';
import API from '../api';
import { reset } from 'redux-form';
import { Dispatch } from 'redux';

interface IUser {
    username: string;
    email: string;
    fullName: string;
    password: string;
}

export const registerUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.post('/user', user);
            dispatch(showAlert(res.data.status, 'success'));
            dispatch(reset('registerForm'));
        } catch (e) {
            console.error(e.message);
        }
    };
