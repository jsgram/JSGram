import axios from 'axios';
import {store} from "../../App";

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

export const getApiDataAsync = (token: any) => ({
    type: LOGIN_SEND_REQUEST,
    payload: token
});


export const getApiData = () => {
    return (dispatch: Function) => {
      const {email, password} = store.getState().login;
        axios.post('http://localhost:8080/auth/login', {
            email,
            password
        })
            .then((response: any) => response)
            .then(json => dispatch(getApiDataAsync(json.data)))
            .catch(function (error) {
                console.log(error);
            });
    };

};