export const LOGIN_CHANGE_EMAIL_TEXT = 'LOGIN_CHANGE_EMAIL_TEXT';
export const LOGIN_CHANGE_PASSWORD_TEXT = 'LOGIN_CHANGE_PASSWORD_TEXT';

export const setEmailText = (email) => ({
    type: LOGIN_CHANGE_EMAIL_TEXT,
    payload: email
});

export const setPasswordText = (password) => ({
    type: LOGIN_CHANGE_PASSWORD_TEXT,
    payload: password
});