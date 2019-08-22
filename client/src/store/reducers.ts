import { combineReducers } from 'redux';
import { alertReducer } from './alert/reducers';
import { reducer as formReducer } from 'redux-form';
import { profileReducer } from './profile/reducers';
import { cropperReducer } from './cropper/reducers';
import { changeEmailReducer } from './emailChange/reducers';

export default combineReducers({
    form: formReducer,
    alert: alertReducer,
    profile: profileReducer,
    cropper: cropperReducer,
    changeEmail: changeEmailReducer,
});
