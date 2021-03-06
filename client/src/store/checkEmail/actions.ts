import { showAlert } from '../../store/alert/actions';
import {API} from '../api';
import { Dispatch } from 'redux';
import { history } from '../../history';

export const checkEmail = (email: string): (dispatch: Dispatch) =>
    Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.post('/forgot-password', email);
            dispatch(showAlert(res.data.status, 'success'));
            history.push('/login');
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
