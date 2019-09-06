import {
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    GET_MORE_POSTS_SUCCESS,
    ALL_POSTS_LOADED,
    CLEAR_LOADED,
    DELETE_POST_PENDING,
    DELETE_POST_SUCCESS,
    EDIT_DESCRIPTION_FOR_POST,
    SHOW_SELECTED_POST,
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
    action: { type: string, payload: any, loading: boolean, postId: string }): any => {
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
        case DELETE_POST_PENDING:
            return {
                ...state,
                loaded: false,
                loading: true,
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter((x: IPost): boolean => x._id !== action.payload),
                loaded: true,
                loading: false,
            };
        case SHOW_SELECTED_POST:
            return {
                ...state,
                selectedPost: action.payload,
            };
        case EDIT_DESCRIPTION_FOR_POST:
            return {
                ...state,
                posts: state.posts.map((post: any) => {
                    if (post._id === action.postId) {
                        post.description = action.payload;
                    }
                    return post;
                }),
            };
        default:
            return state;
    }
};
