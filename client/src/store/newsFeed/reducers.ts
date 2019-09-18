import {
    GET_NEWS_FEED_PENDING,
    GET_NEWS_FEED_SUCCESS,
    GET_MORE_NEWS_FEED_SUCCESS,
    UPLOAD_NEXT_FEED_POSTS,
    ALL_NEWS_FEED_LOADED,
    CLEAR_NEWS_FEED_LOADED,
    GET_RECOMMENDATIONS_PENDING,
    GET_RECOMMENDATIONS_SUCCESS,
} from './actionTypes';
import { IUser } from '../../components/FriendsRecommendations';

export interface INewsFeed {
    _id: string;
    description: string;
    comments: [];
    tags: [];
    authorsOfLike: [];
    likeExist: boolean;
    imgPath: string;
    createdAt: string;
    author: {
        _id: string;
        username: string;
        photoPath: string;
    };
}

export interface IFeedState {
    feed: any;
    page: number;
    feedLoaded: boolean;
    feedLoading: boolean;
    friendsRecommendations: {users: IUser[], loading: boolean};
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
    feedLoaded: false,
    feedLoading: false,
    friendsRecommendations: {
        users: [],
        loading: false,
    },
};

export const newsFeedReducer = (
    state: IFeedState = defaultState,
    action: { type: string, payload: any }): any => {
    switch (action.type) {
        case GET_NEWS_FEED_PENDING:
            return {
                ...state,
                feedLoading: true,
            };

        case GET_NEWS_FEED_SUCCESS:
            return {
                ...state,
                feed: action.payload,
                feedLoading: false,
            };

        case GET_MORE_NEWS_FEED_SUCCESS:
            return {
                ...state,
                feed: [...state.feed, ...action.payload],
                feedLoading: false,
            };

        case ALL_NEWS_FEED_LOADED:
            return {
                ...state,
                feedLoaded: true,
                feedLoading: false,
            };

        case CLEAR_NEWS_FEED_LOADED:
            return {
                ...state,
                feedLoaded: false,
            };

        case UPLOAD_NEXT_FEED_POSTS:
            return {
                ...state,
                page: action.payload + 1,
            };
        case GET_RECOMMENDATIONS_PENDING:
            return {
                ...state,
                friendsRecommendations: {
                    ...state.friendsRecommendations,
                    loading: true,
                },
            };
        case GET_RECOMMENDATIONS_SUCCESS:
            return {
                ...state,
                friendsRecommendations: {
                    ...state.friendsRecommendations,
                    users: action.payload,
                    loading: false,
                },
            };
        default:
            return state;
    }
};
