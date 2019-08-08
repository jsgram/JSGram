import {
  REGISTER_SET_USERNAME,
  REGISTER_SET_FULLNAME,
  REGISTER_SET_EMAIL,
  REGISTER_SET_PASSWORD,
  REGISTER_USER
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

export const registerUser = (user: object) => (dispatch: Function) => {
  API.post("/user", user)
    .then(response => {
      dispatch({ type: REGISTER_USER });
      dispatch(showAlert(response.data.status, "success"));
    })
    .catch(err => console.error(err.message));
};
