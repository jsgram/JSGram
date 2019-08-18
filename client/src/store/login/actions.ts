import API from '../api';
import { showAlert } from '../alert/actions';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';
import { history } from '../../history';
import { setToken } from './setToken.helper';

const TOKEN = 'TOKEN';

export const loginUser = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await API.post('/auth/login', user);
            if (res.status === 200) {
                dispatch(showAlert('Welcome', 'success'));
                history.push('/');
            }
            setToken(res.data.token);
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };

export const logOut = (): void => {
    localStorage.removeItem(TOKEN);
}

export const isToken = localStorage.getItem(TOKEN);