import { SET_EMAIL_TEXT } from './actionTypes';
import { Dispatch } from 'redux';
import { store } from '../../App';
import { showAlert } from '../alert/actions';

export const setEmailText = (email: string): { type: string, payload: string } => ({
    type: SET_EMAIL_TEXT,
    payload: email,
});

// TODO Add real api call and change alert message
export const changeEmail = (): (dispatch: Dispatch) =>
    Promise<void> => async (dispatch: Dispatch): Promise<void> => {
    try {
        const {changeEmail: {email}}: { changeEmail: { email: string } } = store.getState();
        dispatch(showAlert(email, 'success'));
    } catch (e) {
        dispatch(showAlert(e.response.data.message, 'danger'));
    }
};
