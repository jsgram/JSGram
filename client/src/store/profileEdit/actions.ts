import { showAlert } from '../alert/actions';
import { reset } from 'redux-form';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';

export const editProfile = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            // const res = await AuthAPI.post('/user', user);
            console.log('profile: ', user);
            dispatch(showAlert('Your profile is successfully changed', 'success'));
            dispatch(reset('profileEditForm'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
