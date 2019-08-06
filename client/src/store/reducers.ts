import { combineReducers } from "redux";
import { loginReducer } from "./login/reducers";
import { registerReducer } from "./register/reducers";

export default combineReducers({
  login: loginReducer,
  register: registerReducer
});
