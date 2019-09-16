import { SET_LOGGED_USERNAME } from './actionTypes';

export interface IFeedState {
    loggedUsername: string;
    loggedId: string;
    loggedPhotoPath: string;
}

interface IAction {
    type: string;
    payload: {
        loggedUsername: string,
        loggedId: string,
        loggedPhotoPath: string,
    };
}

const defaultState = {
    loggedUsername: '',
    loggedId: '',
    loggedPhotoPath: '',
};

export const feedReducer = (state: IFeedState = defaultState, action: IAction): IFeedState => {
    switch (action.type) {
        case SET_LOGGED_USERNAME:
            return {
                ...state,
                loggedUsername: action.payload.loggedUsername,
                loggedId: action.payload.loggedId,
                loggedPhotoPath: action.payload.loggedPhotoPath,
            };
        default:
            return state;
    }
};
