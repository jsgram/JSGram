import {
  REGISTER_SET_USERNAME,
  REGISTER_SET_FULLNAME,
  REGISTER_SET_EMAIL,
  REGISTER_SET_PASSWORD,
  REGISTER_USER,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from "./actionTypes";
import { showAlert } from "../alert/actions";
import API from "../api";

export const setUsername = (username: string) => ({
  type: REGISTER_SET_USERNAME,
  payload: username
});

export const setFullname = (fullname: string) => ({
  type: REGISTER_SET_FULLNAME,
  payload: fullname
});

export const setEmail = (email: string) => ({
  type: REGISTER_SET_EMAIL,
  payload: email
});

export const setPassword = (password: string) => ({
  type: REGISTER_SET_PASSWORD,
  payload: password
});

export const registerPending = () => ({
  type: REGISTER_PENDING
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

export const registerError = (error: string) => ({
  type: REGISTER_ERROR,
  payload: error
});

export const registerUser = (user: object) => (dispatch: Function) => {
  dispatch(registerPending());
  API.post("/user", user)
    .then(response => {
      dispatch({ type: REGISTER_USER });
      dispatch(registerSuccess());
      dispatch(showAlert(response.data.status, "success"));
    })
    .catch(err => dispatch(registerError(err.message)));
};
