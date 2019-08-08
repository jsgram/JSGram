import axios from 'axios';
import {store} from '../../App';

export const LOGIN_CHANGE_EMAIL_TEXT = 'LOGIN_CHANGE_EMAIL_TEXT';
export const LOGIN_CHANGE_PASSWORD_TEXT = 'LOGIN_CHANGE_PASSWORD_TEXT';
export const LOGIN_SEND_REQUEST = 'LOGIN_SEND_REQUEST';

export const setEmailText = (email: string) => ({
  type: LOGIN_CHANGE_EMAIL_TEXT,
  payload: email
});

export const setPasswordText = (password: string) => ({
  type: LOGIN_CHANGE_PASSWORD_TEXT,
  payload: password
});

export const getApiData = () => {
  return (dispatch: Function) => {
    const {email, password} = store.getState().login;
    axios.post((process.env.REACT_APP_NOT_SECRET_CODE + '/auth/login'), {
      email,
      password
    })
      .then((response) => response)
      .then(json => {
        localStorage.setItem('TOKEN', json.data.token);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

};
