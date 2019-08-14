import { SHOW_ALERT, CLEAR_ALERT } from './actionTypes';

export const showAlert = (message: string, color: string): {type: string, message: string, color: string} => ({
    type: SHOW_ALERT,
    message,
    color,
});

export const clearAlert = (): {type: string} => ({ type: CLEAR_ALERT });
