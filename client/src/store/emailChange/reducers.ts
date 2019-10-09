import {
    SET_EMAIL_TEXT,
} from './actionTypes';

export const defaultState = {
    email: '',
};

interface IState {
    email: string;
}

interface IAction {
    type: string;
    payload: any;
}

export const changeEmailReducer = (state: IState = defaultState, action: IAction): IState => {
    switch (action.type) {
        case SET_EMAIL_TEXT:
            return {
                ...state,
                email: action.payload,
            };
        default:
            return state;
    }
};
