import {
    GET_MENTION_LIST_PENDING,
    GET_MENTION_LIST_SUCCESS,
    GET_MORE_MENTION_LIST_SUCCESS,
    UPLOAD_NEXT_MENTION_LIST,
    ALL_MENTION_LIST_LOADED,
    CLEAR_MENTION_LIST_LOADED,
} from './actionTypes';
import { IUser } from '../../components/FriendsRecommendations';

export interface INewsFeed {
    _id: string;
    description: string;
    comments: string[];
    tags: string[];
    authorsOfLike: string[];
    imgPath: string;
    createdAt: string;
    author: {
        _id: string;
        username: string;
        photoPath: string;
    };
}

export interface IFeedState {
    feed: INewsFeed[];
    page: number;
    feedLoaded: boolean;
    feedLoading: boolean;
    friendsRecommendations: {users: IUser[], loading: boolean};
}

export const defaultState = {
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

export const mentionListReducer = (
    state: IFeedState = defaultState,
    action: { type: string, payload: any }): IFeedState => {
    switch (action.type) {
        case GET_MENTION_LIST_PENDING:
            return {
                ...state,
                feedLoading: true,
            };

        case GET_MENTION_LIST_SUCCESS:
            return {
                ...state,
                feed: action.payload,
                feedLoading: false,
            };

        case GET_MORE_MENTION_LIST_SUCCESS:
            return {
                ...state,
                feed: [...state.feed, ...action.payload],
                feedLoading: false,
            };

        case ALL_MENTION_LIST_LOADED:
            return {
                ...state,
                feedLoaded: true,
                feedLoading: false,
            };

        case CLEAR_MENTION_LIST_LOADED:
            return {
                ...state,
                feedLoaded: false,
            };

        case UPLOAD_NEXT_MENTION_LIST:
            return {
                ...state,
                page: action.payload + 1,
            };
        default:
            return state;
    }
};
