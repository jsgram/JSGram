import { CHANGE_PASSWORD_PENDING, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR } from './actionTypes';

interface IAction {
    type: string;
    payload: any;
}

export const defaultState = {
    password: '',
    error: '',
    loaded: false,
    loading: false,
};

export const changePasswordReducer = (
        state: {password: string} = defaultState,
        action: IAction): any => {
    switch (action.type) {
        case CHANGE_PASSWORD_PENDING:
            return {
                ...state,
                loaded: false,
                loading: true,
                error: '',
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                password: action.payload,
                loaded: true,
                loading: false,
            };
        case CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
                loaded: false,
                loading: false,
            };
        default:
            return state;
    }
};
