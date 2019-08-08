import API from '../api';
import {store} from '../../App';
import {
  LOGIN_CHANGE_EMAIL_TEXT,
  LOGIN_CHANGE_PASSWORD_TEXT
} from './actionTypes';

const TOKEN = 'TOKEN';

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
    const {login: {email, password}} = store.getState();
    API.post(('/auth/login'), {
      email,
      password
    })
      .then((response) => response)
      .then(json => {
        localStorage.setItem(TOKEN, json.data.token);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

};
