import { showAlert } from '../../store/alert/actions';
import API from '../api';
import { Dispatch } from 'redux';

export const checkEmail = (email: object): (dispatch: Dispatch) =>
    Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.post('/forgot-password', email);
            dispatch(showAlert(res.data.status, 'success'));
        } catch (e) {
            dispatch(showAlert(e.message, 'danger'));
        }
    };
