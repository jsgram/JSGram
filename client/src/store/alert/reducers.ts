import { SHOW_ALERT, CLEAR_ALERT } from './actionTypes';

interface IAction {
    type: string;
    message: string;
    color: string;
}

interface IState {
    message: string;
    color: string;
}

export const initialState = {message: '', color: ''};

export const alertReducer = (state: IState = initialState, action: IAction): IState => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message: action.message,
                color: action.color,
            };
        case CLEAR_ALERT:
            return {...initialState};
        default:
            return state;
    }
};
