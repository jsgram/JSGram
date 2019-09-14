import {
    SET_AUTHORS_OF_LIKES,
    CHECK_LOGGED_USER_LIKE_EXIST,
    ADD_USER_LIKE,
    REMOVE_USER_LIKE,
} from './actionTypes';

export interface ILike {
    authorsOfLike: never[];
    loggedUserLikeExist: boolean;
}

const defaultState = {
    authorsOfLike: [],
    loggedUserLikeExist: false,
};

export const likesReducer = (
    state: ILike = defaultState,
    action: { type: string, payload: any }): any => {
    switch (action.type) {
        case SET_AUTHORS_OF_LIKES:
            return {
                ...state,
                authorsOfLike: action.payload,
            };
        case CHECK_LOGGED_USER_LIKE_EXIST:
            return {
                ...state,
                loggedUserLikeExist: action.payload,
            };
        case ADD_USER_LIKE:
            return {
                ...state,
                authorsOfLike: [...state.authorsOfLike, action.payload],
            };
        case REMOVE_USER_LIKE:
            return {
                ...state,
                authorsOfLike: state.authorsOfLike.filter((userId: string) => userId !== action.payload),
            };
        default:
            return state;
    }
};
