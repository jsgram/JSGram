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
    RESET_POSTS,
    UPLOAD_NEXT_POSTS,
    ADD_USER_LIKE_TO_SELECTED_POST,
    REMOVE_USER_LIKE_FROM_SELECTED_POST,
    NEW_DESCRIPTION_FOR_POST,
    CHANGE_EDIT_STATUS_POST,
} from './actionTypes';

export interface IPost {
    _id: string;
    imgPath: string;
    author: string;
    description: string;
    tags: any;
    comments: any;
    authorsOfLike: any;
    fullComments: [];
    createdAt: string;
}

export interface IPosts {
    posts: IPost[];
    page: number;
    commentsPage: number;
    selectedPost: IPost;
    countOfLikes: number;
    likeExist: boolean;
    loaded: boolean;
    loading: boolean;
    commentsLoading: boolean;
    commentsLoaded: boolean;
}

export const defaultState = {
    posts: [],
    page: 1,
    commentsPage: 1,
    selectedPost: {},
    countOfLikes: 0,
    likeExist: false,
    loaded: false,
    loading: false,
    commentsLoading: false,
    commentsLoaded: false,
};

export const postReducer = (
    state: any = defaultState,
    action: { type: string, payload: any }): any => {
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
        case NEW_DESCRIPTION_FOR_POST:
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    newDescription: action.payload.description,
                },
                posts: state.posts.map((post: IPost) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            newDescription: action.payload.description,
                        };
                    }
                    return post;
                }),
            };
        case CHANGE_EDIT_STATUS_POST:
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    newDescription: state.selectedPost.description,
                },
                posts: state.posts.map((post: IPost) => {
                    if (post._id === action.payload) {
                        return {
                            ...post,
                            newDescription: post.description,
                        };
                    }
                    return post;
                }),
            };
        case EDIT_DESCRIPTION_FOR_POST:
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    description: action.payload.description,
                },
                posts: state.posts.map((post: IPost) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            description: action.payload.description,
                        };
                    }
                    return post;
                }),
            };
        case UPLOAD_NEXT_POSTS:
            return {
                ...state,
                page: action.payload,
            };
        case RESET_POSTS:
            return {
                ...state,
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
                page: 1,
            };
        case ADD_USER_LIKE_TO_SELECTED_POST:
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                },
                posts: state.posts.map((post: any) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            authorsOfLike: [...post.authorsOfLike, action.payload.loggedId],
                        };
                    }
                    return post;
                }),
            };
        case REMOVE_USER_LIKE_FROM_SELECTED_POST:
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                },
                posts: state.posts.map((post: any) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            authorsOfLike: post.authorsOfLike.filter((userId: string) =>
                                userId !== action.payload.loggedId),
                        };
                    }
                    return post;
                }),
            };
        default:
            return state;
    }
};
