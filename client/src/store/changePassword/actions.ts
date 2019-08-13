import { showAlert } from '../../store/alert/actions';
import API from '../api';
import { Dispatch } from 'redux';

export const changePassword = (password: string, token: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.put(`/forgot-password/${token}`, password);
            dispatch(showAlert(res.data.status, 'success'));
        } catch (e) {
            console.error(e.message);
        }
    };
