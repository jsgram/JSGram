import {
    SET_EMAIL_TEXT,
} from './actionTypes';

const defaultState = {
    email: '',
};

interface IAction {
    type: string;
    payload: any;
}

export const changeEmailReducer = (state: {email: string} = defaultState, action: IAction): any => {
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
