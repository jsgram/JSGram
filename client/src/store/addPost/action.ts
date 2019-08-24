import { Dispatch } from 'redux';
import { showAlert } from '../alert/actions';
import { base64ToFile, createDataForAWS } from '../../helpers/upload.photo';
import { AuthAPI } from '../api';
import { history } from '../../history';

// TODO Currently this is post method for Avatar. Need to change to post method for Post.
export const uploadPost = (croppedImage: string): (dispatch: Dispatch) => Promise<void> =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const newFile = await base64ToFile(croppedImage, 'avatar', 'image/png');
            await AuthAPI.post('/profile/photo', createDataForAWS(newFile));
            history.push('/profile');
            dispatch(showAlert('Successfully uploaded', 'success'));
        } catch (e) {
            showAlert(e.response.data.message, 'danger');
        }
    };
