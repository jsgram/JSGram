import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { base64ToFile, dataForAWS } from '../../helpers/upload.photo';
import { AuthAPI } from '../api';
import { history } from '../../history';

export const uploadPost = (croppedImage: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const newFile = await base64ToFile(croppedImage, 'avatar', 'image/png');
            const res = await AuthAPI.post('/profile/photo', dataForAWS(newFile));
            if (res.status === 200) {
                history.push('/profile');
            }
            dispatch(showAlert('Successfully uploaded', 'success'));
        } catch (e) {
            showAlert(e.response.data.message, 'danger');
        }
    };
