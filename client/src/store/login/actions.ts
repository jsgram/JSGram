import axios from 'axios';

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
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: 'foo',
            body: 'bar',
            userId: 1
        })
            .then((response: any) => response)
            .then(json => dispatch(getApiDataAsync(json.data.title)))
            .catch(function (error) {
                console.log(error);
            });
    };

};