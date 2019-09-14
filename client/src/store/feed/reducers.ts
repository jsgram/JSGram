import { SET_LOGGED_USERNAME } from './actionTypes';

export interface IFeedState {
    loggedUsername: string;
    loggedId: string;
}

interface IAction {
    type: string;
    payload: {
        loggedUsername: string,
        loggedId: string,
    };
}

const defaultState = {
    loggedUsername: '',
    loggedId: '',
};

export const feedReducer = (state: IFeedState = defaultState, action: IAction): IFeedState => {
    switch (action.type) {
        case SET_LOGGED_USERNAME:
            return {
                ...state,
                loggedUsername: action.payload.loggedUsername,
                loggedId: action.payload.loggedId,
            };
        default:
            return state;
    }
};
