import {
    CHECK_EMAIL_SET_EMAIL,
    CHECK_EMAIL_PENDING,
    CHECK_EMAIL_SUCCESS,
    CHECK_EMAIL_ERROR
} from "./actionTypes";
import API from '../api';

export const setEmail = (email: string) => ({
    type: CHECK_EMAIL_SET_EMAIL,
    payload: email
});

export const checkPasswordPending = () => ({
    type: CHECK_EMAIL_PENDING
});

export const checkPasswordSuccess = () => ({
    type: CHECK_EMAIL_SUCCESS
});

export const checkPasswordError = (error: string) => ({
    type: CHECK_EMAIL_ERROR,
    payload: error
});

export const checkEmail = (email: string) => async (dispatch: Function) => {
    try {
        dispatch(checkPasswordPending());
        console.log('aaaaaa');
        const res = await API.post('/forgot-password', email);
        console.log(res);
        if(!res){
            throw new Error('No response')
        }
        dispatch(checkPasswordSuccess());
    } catch (err) {
        dispatch(checkPasswordError(err.message));
    }
};
