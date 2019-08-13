import API from '../api';
import {store} from '../../App';
import {
  LOGIN_CHANGE_EMAIL_TEXT,
  LOGIN_CHANGE_PASSWORD_TEXT,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './actionTypes';
import {setToken} from "./setToken.helper";

export const setEmailText = (email: string) => ({
  type: LOGIN_CHANGE_EMAIL_TEXT,
  payload: email
});

export const setPasswordText = (password: string) => ({
  type: LOGIN_CHANGE_PASSWORD_TEXT,
  payload: password
});

export const loginPending = () => ({
  type: LOGIN_PENDING
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginError = (error: any) => ({
  type: LOGIN_ERROR,
  payload: error
});

export const getApiData = () => {
  return (dispatch: Function) => {
    const {login: {email, password}} = store.getState();
    dispatch(loginPending());
    API.post(('/auth/login'), {
      email,
      password
    })
      .then((response) => response)
      .then(json => {
        dispatch(loginSuccess());
        setToken(json.data.token);
      })
      .catch(function(error) {
        dispatch(loginError(error));
      });
  };

};
