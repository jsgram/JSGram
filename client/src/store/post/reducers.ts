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
    CHECK_USER_LIKE_EXIST,
    SET_COUNTS_OF_LIKES,
    ADD_USER_LIKE,
    REMOVE_USER_LIKE,
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
    page: 1,
    selectedPost: {},
    countOfLikes: 0,
    likeExist: false,
    loaded: false,
    loading: false,
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
        case EDIT_DESCRIPTION_FOR_POST:
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    description: action.payload.description,
                },
                posts: state.posts.map((post: any) => {
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
        case ADD_USER_LIKE:
            const addNewAuthorToLikeArray = [...action.payload.authorsOfLike, action.payload.loggedUserId];
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    authorsOfLike: addNewAuthorToLikeArray,
                },
                posts: state.posts.map((post: any) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            authorsOfLike: addNewAuthorToLikeArray,
                        };
                    }
                    return post;
                }),
            };
        case REMOVE_USER_LIKE:
            const removeAuthorsFromLikeArray = action.payload.authorsOfLike.filter((like: string) =>
                like !== action.payload.loggedUserId);
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    authorsOfLike: removeAuthorsFromLikeArray,
                },
                posts: state.posts.map((post: any) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            authorsOfLike: removeAuthorsFromLikeArray,
                        };
                    }
                    return post;
                }),
            };
        default:
            return state;
    }
};
