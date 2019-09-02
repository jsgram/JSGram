import {
    ADD_LIKE,
    GET_LIKE,
    DELETE_LIKE,
} from './actionTypes';

interface IState {
    like: boolean;
    count: number;
}

export const defaultState = {
    like: false,
    count: 0,
};

export const likeReducers = (state: IState = defaultState, action: any): any => {
    switch (action.type) {
    case GET_LIKE:
        return {
            ...state,
        };
    case ADD_LIKE:
        return {
            ...state,
            like: true,
            count: state.count + 1,
        };
    case DELETE_LIKE:
        return {
            ...state,
            like: false,
            count: state.count - 1,
        };
    default:
        return state;
    }
};
