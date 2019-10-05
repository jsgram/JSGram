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

interface IAuthor {
    [authorId: string]: {
        _id: string;
        username: string;
        email: string;
        photoPath: string;
    };
}

interface IComment {
    [commentId: string]: {
        authorId: string;
        postId: string;
        comment: string;
        isEdit: boolean;
    };
}

interface IComments {
    comments: IComment;
    authors: IAuthor;
    allCommentsId: string[];
    onChangeComments: any[];
    commentsPage: any[];
    allCommentsLoaded: any[];
    commentsLoading: boolean;
}

const defaultState = {
    comments: {},
    authors: {},
    allCommentsId: [],
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
            const {normalizedComments: {entities: {authors, comments}, result}, postId, page}:
                {
                    normalizedComments: { entities: { authors: {}, comments: {} }, result: [] },
                    postId: string, page: number,
                }
                = action.payload;

            const commentPageExist = state.commentsPage.some((commentState: any) =>
                commentState.postId === postId);

            const commentsState = commentPageExist ?
                state.commentsPage.map((commentState: any) => {
                    if (commentState.postId === postId) {
                        return {
                            postId,
                            page,
                        };
                    }
                    return commentState;
                })
                :
                [...state.commentsPage, {postId, page}];
            return {
                ...state,
                comments: {...state.comments, ...comments},
                authors: {...state.authors, ...authors},
                allCommentsId: [...state.allCommentsId, ...result],
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
                comments: {},
                authors: {},
                allCommentsId: [],
                commentsPage: [],
                allCommentsLoaded: [],
            };
        case SET_DEFAULT_COMMENT_ON_CHANGE:
            const defaultCommentExist = state.onChangeComments.some((info: { postId: string }) =>
                info.postId === action.payload);
            const defaultChangeComment = defaultCommentExist ?
                [...state.onChangeComments]
                :
                [...state.onChangeComments, {postId: action.payload, comment: ''}];
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
                [...state.onChangeComments, {postId: action.payload.postId, comment: action.payload.comment}];
            return {
                ...state,
                onChangeComments: changedComments,
            };
        case ADD_COMMENT:
            const {
                authorId: {_id: authorId, username, photoPath}, comment, postId: newPostId,
                _id: commentId, createdAt,
            }:
                {
                    authorId: { _id: string, username: string, photoPath: string }, comment: string,
                    postId: string, _id: string, createdAt: string,
                } = action.payload;
            const newComment = {
                ...state.comments,
                [commentId]: {
                    _id: commentId,
                    authorId,
                    postId: newPostId,
                    comment,
                    createdAt,
                },
            };
            const newAuthor = {
                ...state.authors,
                [authorId]: {
                    _id: authorId,
                    username,
                    photoPath,
                },
            };
            const newAllCommentsId = [commentId, ...state.allCommentsId];
            return {
                ...state,
                comments: newComment,
                authors: newAuthor,
                allCommentsId: newAllCommentsId,
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
                [...state.onChangeComments, {postId: action.payload.postId, comment: action.payload.comment}];
            return {
                ...state,
                onChangeComments: resetComments,
            };
        case CHANGE_EDIT_STATUS_COMMENT:
            const commentIsEdit = {
                ...state.comments,
                [action.payload]: {
                    ...state.comments[action.payload],
                    isEdit: !state.comments[action.payload].isEdit,
                    newComment: state.comments[action.payload].comment,
                },
            };
            return {
                ...state,
                comments: commentIsEdit,
            };
        case CHANGE_COMMENT:
            const newCommentOnChange = {
                ...state.comments,
                [action.payload.commentId]: {
                    ...state.comments[action.payload.commentId],
                    newComment: action.payload.comment,
                },
            };
            return {
                ...state,
                comments: newCommentOnChange,
            };
        case EDIT_COMMENT:
            const editedComment = {
                ...state.comments,
                [action.payload.commentId]: {
                    ...state.comments[action.payload.commentId],
                    comment: action.payload.comment,
                },
            };
            return {
                ...state,
                comments: editedComment,
            };
        case DELETE_COMMENT:
            const deletedCommentId = state.allCommentsId.filter((deleteCommentId: string): boolean =>
                deleteCommentId !== action.payload);
            const deletedComment = {
                ...state.comments,
                [action.payload]: null,
            };
            return {
                ...state,
                allCommentsId: deletedCommentId,
                comments: deletedComment,
            };
        default:
            return state;
    }
};
