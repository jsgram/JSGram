import API from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';

const TOKEN = 'TOKEN';

export const loginUser = (user: object): (dispatch: Dispatch) =>
    Promise<void> => async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.post('/auth/login', user);
            localStorage.setItem(TOKEN, res.data.token);
        } catch (e) {
            console.log(e);
            dispatch(showAlert(e.message, 'danger'));
        }
    };
