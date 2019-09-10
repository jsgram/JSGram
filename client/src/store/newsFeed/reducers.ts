import {
    GET_NEWS_FEED_PENDING,
    GET_NEWS_FEED_SUCCESS,
    GET_MORE_NEWS_FEED_SUCCESS,
    UPLOAD_NEXT_FEED_POSTS,
    ALL_NEWS_FEED_LOADED,
    CLEAR_NEWS_FEED_LOADED,
} from './actionTypes';
import {
    CHECK_USER_LIKE_EXIST,
    SET_COUNTS_OF_LIKES,
    ADD_USER_LIKE,
    REMOVE_USER_LIKE,
} from '../post/actionTypes';

export interface INewsFeed {
    description: string;
    comments: any;
    tags: any;
    authorsOfLike: any;
    _id: string;
    imgPath: string;
    author: any;
    photoPath: string;
    username: string;
    createdAt: string;
}

const defaultState = {
    feed: [
        {
            description: '',
            comments: [],
            tags: [],
            authorsOfLike: [],
            likeExist: false,
            _id: '',
            imgPath: '',
            author: {
                photoPath: '',
                _id: '',
                username: '',
            },
            createdAt: '',
        },
    ],
    page: 1,
    countOfLikes: 0,
    loaded: false,
    loading: false,
};

export const newsFeedReducer = (
    state: any = defaultState,
    action: { type: string, payload: any}): any => {
    switch (action.type) {
        case GET_NEWS_FEED_PENDING:
            return {
                ...state,
                loading: true,
            };

        case GET_NEWS_FEED_SUCCESS:
            return {
                ...state,
                feed: action.payload,
                loading: false,
            };

        case GET_MORE_NEWS_FEED_SUCCESS:
            return {
                ...state,
                feed: [...state.feed, ...action.payload],
                loading: false,
            };

        case ALL_NEWS_FEED_LOADED:
            return {
                ...state,
                loaded: true,
                loading: false,
            };

        case CLEAR_NEWS_FEED_LOADED:
            return {
                ...state,
                loaded: false,
            };

        case UPLOAD_NEXT_FEED_POSTS:
            return {
                ...state,
                page: action.payload,
            };

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

        case ADD_USER_LIKE:
            const addNewAuthorToLikeArray = [...action.payload.authorsOfLike, action.payload.loggedUserId];
            return {
                ...state,
                feed: state.feed.map((feed: any) => {
                    if (feed._id === action.payload.postId) {
                        return {
                            ...feed,
                            authorsOfLike: addNewAuthorToLikeArray,
                            likeExist: addNewAuthorToLikeArray.includes(action.payload.loggedUserId),
                        };
                    }
                    return feed;
                }),
            };
        case REMOVE_USER_LIKE:
            const removeAuthorsFromLikeArray = action.payload.authorsOfLike.filter((like: string) =>
                like !== action.payload.loggedUserId);
            return {
                ...state,
                feed: state.feed.map((feed: any) => {
                    if (feed._id === action.payload.postId) {
                        return {
                            ...feed,
                            authorsOfLike: removeAuthorsFromLikeArray,
                            likeExist: removeAuthorsFromLikeArray.includes(action.payload.loggedUserId),
                        };
                    }
                    return feed;
                }),
            };

        default:
            return state;
    }
};
