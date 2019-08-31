import { SET_NEW_USERNAME } from './actionTypes';

export interface IStateProfileEdit {
    newUsername: string;
}

interface IAction {
    type: string;
    payload: string;
}

const defaultState = {
    newUsername: '',
};

export const profileEditReducer = (state: IStateProfileEdit = defaultState, action: IAction): IStateProfileEdit => {
    switch (action.type) {
    case SET_NEW_USERNAME:
        return {
            newUsername: action.payload,
        };
    default:
        return state;
    }
};
