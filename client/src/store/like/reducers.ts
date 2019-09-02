import {
    SET_COUNTS_OF_LIKES,
} from './actionTypes';

interface IState {
    countOfLikes: number;
}

export const defaultState = {
    like: false,
    countOfLikes: 0,
};

export const likeReducers = (state: IState = defaultState, action: any): any => {
    switch (action.type) {
    case SET_COUNTS_OF_LIKES:
        return {
            ...state,
            countOfLikes: action.payload,
        };

    default:
        return state;
    }
};
