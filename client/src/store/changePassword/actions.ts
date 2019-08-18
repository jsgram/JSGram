import { showAlert } from '../../store/alert/actions';
import {AuthAPI} from '../api';
import { Dispatch } from 'redux';

export const changePassword = (password: string, token: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await AuthAPI.put(`/forgot-password/${token}`, password);
            dispatch(showAlert(res.data.status, 'success'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
