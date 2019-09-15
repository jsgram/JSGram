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
        default:
            return state;
    }
};
