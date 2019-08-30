import { SET_USERNAME } from './actionTypes';

export interface IState {
    username: string;
}

interface IAction {
    type: string;
    payload: string;
}

const defaultState = {
    username: '',
};

export const feedReducer = (state: IState = defaultState, action: IAction): IState => {
    switch (action.type) {
    case SET_USERNAME:
        return {
            ...state,
            username: action.payload,
        };

    default:
        return state;
    }
};
