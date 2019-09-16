import {
    ALL_COMMENTS_LOADED,
    GET_COMMENTS_PENDING,
    GET_COMMENTS_SUCCESS,
    RESET_COMMENTS,
} from './actionTypes';

export interface IComment {
    _id: string;
    postId: string;
    comment: string;
    authorId: {
        _id: string;
        username: string;
        photoPath: string;
    };
}

export interface IComments {
    comments: IComment[];
    commentsPage: any;
    allCommentsLoaded: any;
    commentsLoading: boolean;
}

const defaultState = {
    comments: [],
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
                [...state.commentsPage, {postId: action.payload.postId, page: action.payload.page}];
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
        default:
            return state;
    }
};
