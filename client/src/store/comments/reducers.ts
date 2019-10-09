import {
    ALL_COMMENTS_LOADED,
    GET_COMMENTS_PENDING,
    GET_COMMENTS_SUCCESS,
    RESET_COMMENTS,
    SET_DEFAULT_COMMENT_ON_CHANGE,
    ON_CHANGE_COMMENT,
    EDIT_COMMENT,
    CHANGE_COMMENT,
    ADD_COMMENT,
    CHANGE_EDIT_STATUS_COMMENT,
    DELETE_COMMENT,
    RESET_COMMENT,
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
    onChangeComments: Array<{ postId: string, comment: string }>;
    commentsPage: any[];
    allCommentsLoaded: any[];
    commentsLoading: boolean;
}

export const defaultState = {
    comments: [],
    onChangeComments: [],
    commentsPage: [],
    allCommentsLoaded: [],
    commentsLoading: false,
};

export const commentsReducer = (state: IComments = defaultState, action: { type: string, payload: any }): any => {
    switch (action.type) {
        case GET_COMMENTS_PENDING:
            return {
                ...state,
                commentsLoading: true,
            };
        case GET_COMMENTS_SUCCESS:
            const commentPageExist = state.commentsPage.some((commentState: any) =>
                commentState.postId === action.payload.postId);

            const commentsState = commentPageExist ?
                state.commentsPage.map((commentState: any) => {
                    if (commentState.postId === action.payload.postId) {
                        return {
                            postId: commentState.postId,
                            page: action.payload.page,
                        };
                    }
                    return commentState;
                })
                :
                [...state.commentsPage, { postId: action.payload.postId, page: action.payload.page }];
            return {
                ...state,
                comments: [...state.comments, ...action.payload.comments],
                commentsPage: commentsState,
                commentsLoading: false,
            };
        case ALL_COMMENTS_LOADED:
            return {
                ...state,
                allCommentsLoaded: [...state.allCommentsLoaded, action.payload.postId],
            };
        case RESET_COMMENTS:
            return {
                ...state,
                comments: [],
                commentsPage: [],
                allCommentsLoaded: [],
            };
        case SET_DEFAULT_COMMENT_ON_CHANGE:
            const defaultCommentExist = state.onChangeComments.some((info: { postId: string }) =>
                info.postId === action.payload);
            const defaultChangeComment = defaultCommentExist ?
                [...state.onChangeComments]
                :
                [...state.onChangeComments, { postId: action.payload, comment: '' }];
            return {
                ...state,
                onChangeComments: defaultChangeComment,
            };
        case ON_CHANGE_COMMENT:
            const changeCommentExist = state.onChangeComments.some((info: { postId: string }) =>
                info.postId === action.payload.postId);
            const changedComments = changeCommentExist ?
                state.onChangeComments.map((info: { postId: string, comment: string }) => {
                    if (info.postId === action.payload.postId) {
                        return {
                            postId: info.postId,
                            comment: action.payload.comment,
                        };
                    }
                    return info;
                })
                :
                [...state.onChangeComments, { postId: action.payload.postId, comment: action.payload.comment }];
            return {
                ...state,
                onChangeComments: changedComments,
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [{
                    _id: action.payload._id,
                    postId: action.payload.postId,
                    authorId: {
                        _id: action.payload.authorId._id,
                        username: action.payload.authorId.username,
                        photoPath: action.payload.authorId.photoPath,
                    },
                    comment: action.payload.comment,
                    createdAt: action.payload.createdAt,
                }, ...state.comments],
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
                            newComment: comment.comment,
                        };
                    }
                    return comment;
                }),
            };
        case RESET_COMMENT:
            const resetCommentExist = state.onChangeComments.some((info: { postId: string }) =>
                info.postId === action.payload);
            const resetComments = resetCommentExist ?
                state.onChangeComments.map((info: { postId: string, comment: string }) => {
                    if (info.postId === action.payload) {
                        return {
                            postId: info.postId,
                            comment: '',
                        };
                    }
                    return info;
                })
                :
                [...state.onChangeComments, { postId: action.payload.postId, comment: action.payload.comment }];
            return {
                ...state,
                onChangeComments: resetComments,
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
