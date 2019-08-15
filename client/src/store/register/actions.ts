import { showAlert } from '../../store/alert/actions';
import API from '../api';
import { reset } from 'redux-form';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';

export const registerUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.post('/user', user);
            dispatch(showAlert(res.data.status, 'success'));
            dispatch(reset('registerForm'));
        } catch (e) {
            if (e.message.includes('409')) {
                dispatch(showAlert('The email address you have entered is ' +
                    'already associated with another account', 'danger'));
            } else if (e.message.includes('500')) {
                dispatch(showAlert('Sorry, can not create user', 'danger'));
            } else {
                dispatch(showAlert(e.message, 'danger'));
            }
        }
    };
