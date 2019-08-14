import { combineReducers } from 'redux';
import { alertReducer } from './alert/reducers';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    form: formReducer,
    alert: alertReducer,
});
