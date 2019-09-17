import {
    ALL_COMMENTS_LOADED,
    GET_COMMENTS_PENDING,
    GET_COMMENTS_SUCCESS,
    RESET_COMMENTS,
    EDIT_COMMENT,
    CHANGE_COMMENT,
    CHANGE_EDIT_STATUS_COMMENT,
    ADD_COMMENT_DISPATCH,
    DELETE_COMMENT,
} from './actionTypes';

export interface IComment {
    _id: string;
    postId: string;
    comment: string;
    authorId: {
        _id: string;
        username: string;
        photoPath: string;
        email: string;
    };
    isEdit: boolean;
    newComment: string;
}

export interface IComments {
    comments: IComment[];
    commentsPage: number;
    commentsLoading: boolean;
    allCommentsLoaded: boolean;
}

const defaultState = {
    comments: [],
    commentsPage: 1,
    commentsLoading: false,
    allCommentsLoaded: false,
};

export const commentsReducer = (state: IComments = defaultState, action: { type: string, payload: any }): any => {
    switch (action.type) {
        case GET_COMMENTS_PENDING:
            return {
                ...state,
                commentsLoading: true,
            };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, ...action.payload.comments],
                commentsPage: action.payload.page,
                commentsLoading: false,
            };
        case ALL_COMMENTS_LOADED:
            return {
                ...state,
                allCommentsLoaded: true,
            };
        case RESET_COMMENTS:
            return {
                ...state,
                comments: [],
                commentsPage: 1,
                allCommentsLoaded: false,
            };
        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment: any) => {
                    if (comment._id === action.payload.commentId) {
                        return {
                            ...comment,
                            comment: action.payload.comment,
                        };
                    }
                    return comment;
                }),
            };
        case CHANGE_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment: any) => {
                    if (comment._id === action.payload.commentId) {
                        return {
                            ...comment,
                            newComment: action.payload.comment,
                        };
                    }
                    return comment;
                }),
            };
        case CHANGE_EDIT_STATUS_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment: any) => {
                    if (comment._id === action.payload) {
                        return {
                            ...comment,
                            isEdit: !comment.isEdit,
                        };
                    }
                    return comment;
                }),
            };
        case ADD_COMMENT_DISPATCH:
            return {
                ...state,
                comments: [...state.comments, {
                    _id: action.payload._id,
                    postId: action.payload.postId,
                    authorId: {
                        _id: action.payload.authorId._id,
                        username: action.payload.authorId.username,
                        photoPath: action.payload.authorId.photoPath,
                    },
                    comment: action.payload.comment,
                    createdAt: action.payload.createdAt,
                }],
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter((x: IComment): boolean => x._id !== action.payload),
            };
        default:
            return state;
    }
};
