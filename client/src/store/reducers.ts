import {combineReducers} from "redux";
import {loginReducer} from "./login/reducers";

export default combineReducers({
    login: loginReducer,
});