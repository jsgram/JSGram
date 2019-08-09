import { combineReducers } from "redux";
import { loginReducer } from "./login/reducers";
import { registerReducer } from "./register/reducers";
import { alertReducer } from "./alert/reducers";
import {checkEmailReducer} from "./checkEmail/reducer";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  alert: alertReducer,
  checkEmail: checkEmailReducer
});
