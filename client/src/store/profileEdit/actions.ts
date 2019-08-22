import { showAlert } from '../alert/actions';
import { reset } from 'redux-form';
import { Dispatch } from 'redux';
import { IUser } from '../commonInterfaces/commonInterfaces';

// TODO Add real api request
export const editProfile = (user: IUser): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(showAlert('Your profile is successfully changed', 'success'));
            dispatch(reset('profileEditForm'));
        } catch (e) {
            dispatch(showAlert(e.response.data.message, 'danger'));
        }
    };
