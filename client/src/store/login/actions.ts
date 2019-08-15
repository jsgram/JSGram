import API from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';

const TOKEN = 'TOKEN';

export const loginUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.post('/auth/login', user);
            localStorage.setItem(TOKEN, res.data.token);
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
