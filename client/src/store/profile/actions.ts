import { GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_ERROR, END_LOADING } from './actionTypes';
import axios from 'axios';

const ANIMATION_TIMEOUT = 3000;

export const getUserPending = (): { type: string } => ({
    type: GET_USER_PENDING,
});

export const getUserSuccess = (user: any): { type: string, payload: any } => ({
    type: GET_USER_SUCCESS,
    payload: user,
});

export const getUserError = (error: Error): { type: string, payload: Error } => ({
    type: GET_USER_ERROR,
    payload: error,
});

export const endLoading = (): {type: string} => ({
    type: END_LOADING,
});

// TODO Pass jwt to post request
// const jwt = 'jwtjwtjwtjwt';

export const getUser = (): any => {
    return (dispatch: any): void => {
        dispatch(getUserPending());
        axios.get(('https://reqres.in/api/users/2'))
            .then((response: any) => {
                dispatch(getUserSuccess(response.data.data));
                setTimeout(() => {
                    dispatch(endLoading());
                },
                    ANIMATION_TIMEOUT,
                );
            })
            .catch((error: Error) => {
                dispatch(getUserError(error));
            });
    };

};
