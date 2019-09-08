import { SET_LOGGED_USERNAME } from './actionTypes';

export interface IState {
    loggedUsername: string;
    urlUsername: string;
}

interface IAction {
    type: string;
    payload: string;
}

const defaultState = {
    loggedUsername: '',
    urlUsername: '',
};

export const feedReducer = (state: IState = defaultState, action: IAction): IState => {
    switch (action.type) {
        case SET_LOGGED_USERNAME:
            return {
                ...state,
                loggedUsername: action.payload,
            };
        default:
            return state;
    }
};
