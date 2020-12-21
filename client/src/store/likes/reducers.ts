import {
    SET_LIKE_PENDING,
    SET_POST_AUTHORS_OF_LIKES,
    SET_FEED_AUTHORS_OF_LIKES,
    CHECK_LOGGED_USER_LIKE_EXIST,
    ADD_USER_LIKE,
    REMOVE_USER_LIKE,
} from './actionTypes';

export interface ILike {
    postAuthorsOfLike: never[];
    feedAuthorsOfLike: any;
    loadingLike: boolean;
    loggedUserLikeExist: boolean;
}

export const defaultState = {
    postAuthorsOfLike: [],
    feedAuthorsOfLike: [],
    loadingLike: false,
    loggedUserLikeExist: false,
};

export const likesReducer = (
    state: ILike = defaultState,
    action: { type: string, payload: any }): any => {
    switch (action.type) {
        case SET_LIKE_PENDING:
            return {
                ...state,
                loadingLike: true,
            };
        case SET_POST_AUTHORS_OF_LIKES:
            return {
                ...state,
                postAuthorsOfLike: action.payload,
                loadingLike: false,
            };
        case SET_FEED_AUTHORS_OF_LIKES:
            return {
                ...state,
                feedAuthorsOfLike: [...state.feedAuthorsOfLike, action.payload],
                loadingLike: false,
            };
        case CHECK_LOGGED_USER_LIKE_EXIST:
            return {
                ...state,
                loggedUserLikeExist: action.payload,
            };
        case ADD_USER_LIKE:
            return {
                ...state,
                postAuthorsOfLike: [...state.postAuthorsOfLike, action.payload.userId],
                feedAuthorsOfLike: state.feedAuthorsOfLike.map((feed: any) => {
                    if (feed.postId === action.payload.postId) {
                        return {
                            ...feed,
                            authorsOfLike: [...feed.authorsOfLike, action.payload.userId],
                            userLikeExist: true,
                        };
                    }
                    return feed;
                }),
                loadingLike: false,
            };
        case REMOVE_USER_LIKE:
            return {
                ...state,
                postAuthorsOfLike: state.postAuthorsOfLike.filter((userId: string) => userId !== action.payload.userId),
                feedAuthorsOfLike: state.feedAuthorsOfLike.map((feed: any) => {
                    if (feed.postId === action.payload.postId) {
                        return {
                            ...feed,
                            authorsOfLike: feed.authorsOfLike.filter((userId: string) =>
                                userId !== action.payload.userId),
                            userLikeExist: false,
                        };
                    }
                    return feed;
                }),
                loadingLike: false,
            };
        default:
            return state;
    }
};
