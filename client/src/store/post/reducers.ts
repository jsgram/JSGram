import {
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    GET_MORE_POSTS_SUCCESS,
    ALL_POSTS_LOADED,
    CLEAR_LOADED,
    SHOW_POST, ADD_OR_REMOVE_AUTHOR_OF_LIKE,
} from './actionTypes';

export interface IPost {
    description: string;
    comments: any;
    tags: any;
    authorsOfLike: any;
    _id: string;
    imgPath: string;
    author: string;
    createdAt: string;
}

const defaultState = {
    posts: [
        {
            description: '',
            comments: [],
            tags: [],
            authorsOfLike: [],
            _id: '',
            imgPath: '',
            author: '',
            createdAt: '',
        },
    ],
    selectedPost: {},
    loaded: false,
    loading: false,
};

export const postReducer = (
    state: any = defaultState,
    action: { type: string, payload: any, loading: boolean }): any => {
    switch (action.type) {
        case GET_POSTS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case GET_MORE_POSTS_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                loading: false,
            };
        case ALL_POSTS_LOADED:
            return {
                ...state,
                loaded: true,
                loading: false,
            };
        case CLEAR_LOADED:
            return {
                ...state,
                loaded: false,
            };
        case SHOW_POST:
            return {
                ...state,
                selectedPost: action.payload,
            };

        case ADD_OR_REMOVE_AUTHOR_OF_LIKE:
            return {
                ...state,
                posts: [
                    {authorsOfLike: action.payload},
                ],
            };

        default:
            return state;
    }
};
