import {
    SET_NEW_FULLNAME,
    SET_NEW_USERNAME,
} from './actionTypes';

export interface IStateProfileEdit {
    newUsername: string;
    newFullName: string;
}

interface IAction {
    type: string;
    payload: string;
}

const defaultState = {
    newUsername: '',
    newFullName: '',
};

export const profileEditReducer = (state: IStateProfileEdit = defaultState, action: IAction): IStateProfileEdit => {
    switch (action.type) {
        case SET_NEW_USERNAME:
            return {
                ...state,
                newUsername: action.payload,
            };
        case SET_NEW_FULLNAME:
            return {
                ...state,
                newFullName: action.payload,
            };
        default:
            return state;
    }
};
