import {
    CHECK_USER_LIKE_EXIST,
    SET_COUNTS_OF_LIKES,
} from './actionTypes';

interface IState {
    countOfLikes: number;
    likeExist: boolean;
}

export const defaultState = {
    countOfLikes: 0,
    likeExist: false,
};

export const likeReducers = (state: IState = defaultState, action: any): any => {
    switch (action.type) {
        case SET_COUNTS_OF_LIKES:
            return {
                ...state,
                countOfLikes: action.payload,
            };

        case CHECK_USER_LIKE_EXIST:
            return {
                ...state,
                likeExist: action.payload,
            };

        default:
            return state;
    }
};
