import { combineReducers } from 'redux';
import { alertReducer } from './alert/reducers';
import { reducer as formReducer } from 'redux-form';
import {profileReducer} from './profile/reducers';
import {cropperReducer } from './cropper/reducers';
import { addPostReducer } from './addPost/reducers';
import {changeEmailReducer} from './emailChange/reducers';
import { feedReducer } from './feed/reducers';
import { profileEditReducer } from './profileEdit/reducers';

export default combineReducers({
    form: formReducer,
    alert: alertReducer,
    profile: profileReducer,
    profileEdit: profileEditReducer,
    cropper: cropperReducer,
    addPost: addPostReducer,
    changeEmail: changeEmailReducer,
    feed: feedReducer,
});
