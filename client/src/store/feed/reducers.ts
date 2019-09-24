import { SET_LOGGED_USERNAME } from './actionTypes';

export interface IFeedState {
    loggedUsername: string;
    loggedId: string;
    loggedPhotoPath: string;
    isAdmin: boolean;
}

interface IAction {
    type: string;
    payload: {
        loggedUsername: string,
        loggedId: string,
        loggedPhotoPath: string,
        isAdmin: boolean,
    };
}

const defaultState = {
    loggedUsername: '',
    loggedId: '',
    loggedPhotoPath: '',
    isAdmin: false,
};

export const feedReducer = (state: IFeedState = defaultState, action: IAction): IFeedState => {
    switch (action.type) {
        case SET_LOGGED_USERNAME:
            return {
                ...state,
                loggedUsername: action.payload.loggedUsername,
                loggedId: action.payload.loggedId,
                loggedPhotoPath: action.payload.loggedPhotoPath,
                isAdmin: action.payload.isAdmin,
            };
        default:
            return state;
    }
};
