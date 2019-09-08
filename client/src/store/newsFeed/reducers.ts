import {
    GET_NEWS_FEED_PENDING,
    GET_NEWS_FEED_SUCCESS,
    GET_MORE_NEWS_FEED_SUCCESS,
    ALL_NEWS_FEED_LOADED,
    CLEAR_NEWS_FEED_LOADED,
} from './actionTypes';

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
    loaded: false,
    loading: false,
};

export const newsFeedReducer = (
    state: any = defaultState,
    action: { type: string, payload: any, loading: boolean }): any => {
    switch (action.type) {
        case GET_NEWS_FEED_PENDING:
            return {
                ...state,
                loading: true,
            };

        case GET_NEWS_FEED_SUCCESS:
            return {
                ...state,
                userNews: action.payload,
                loading: false,
            };

        case GET_MORE_NEWS_FEED_SUCCESS:
            return {
                ...state,
                userNews: [...state.userNews, ...action.payload],
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
    }
};
