import {LOGIN_CHANGE_EMAIL_TEXT, LOGIN_CHANGE_PASSWORD_TEXT, LOGIN_SEND_REQUEST} from "./actions";

const defaultState = {
    email: '',
    password: '',
    token: ''
};

interface Action {
    type: string;
    payload: any;
}

export const loginReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case LOGIN_CHANGE_EMAIL_TEXT:
            return {
                ...state,
                email: action.payload
            };
        case LOGIN_CHANGE_PASSWORD_TEXT:
            return {
                ...state,
                password: action.payload
            };
        case LOGIN_SEND_REQUEST:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
};