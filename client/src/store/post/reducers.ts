import {
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR, GET_MORE_POSTS_SUCCESS, ALL_POSTS_LOADED,
} from './actionTypes';

export interface IPost {
    description: string;
    comments: any;
    tags: any;
    likes: any;
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
            likes: [],
            _id: '',
            imgPath: '',
            author: '',
            createdAt: '',
        },
    ],
    loaded: false,
};

export const postReducer = (
        state: any = defaultState,
        action: { type: string, payload: any }): any => {
    switch (action.type) {
    case GET_POSTS_PENDING:
        return {
            ...state,
        };
    case GET_POSTS_SUCCESS:
        return {
            ...state,
            posts: action.payload,
        };
    case GET_MORE_POSTS_SUCCESS:
        return {
            ...state,
            posts: [...state.posts, ...action.payload],
        };
    case GET_POSTS_ERROR:
        return {
            ...state,
        };
    case ALL_POSTS_LOADED:
        return {
            ...state,
            loaded: action.payload,
        };
    default:
        return state;
    }
};
