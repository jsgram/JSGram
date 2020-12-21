import { commentsReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';
import {
    GET_COMMENTS_PENDING,
    ALL_COMMENTS_LOADED,
    DELETE_COMMENT,
    CHANGE_COMMENT,
    RESET_COMMENTS,
    SET_DEFAULT_COMMENT_ON_CHANGE,
    EDIT_COMMENT,
} from '../actionTypes';

describe('Comments reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            comments: [],
            onChangeComments: [],
            commentsPage: [],
            allCommentsLoaded: [],
            commentsLoading: false,
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('GET_COMMENTS_PENDING', () => {
        const action: any = {
            type: types.GET_COMMENTS_PENDING,
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            commentsLoading: true,
        });
    });

    it('GET_COMMENTS_SUCCESS', () => {
        const action: any = {
            type: types.GET_COMMENTS_PENDING,
            payload: {comments: []},
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            comments: {},
            commentsPage: [],
            commentsLoading: true,
        });
    });

    it('ALL_COMMENTS_LOADED', () => {
        const action: any = {
            type: types.ALL_COMMENTS_LOADED,
            payload: {postId: ''},
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            allCommentsLoaded: [action.payload.postId],
        });
    });

    it('RESET_COMMENTS', () => {
        const action: any = {
            type: types.RESET_COMMENTS,
            payload: {postId: ''},
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            comments: {},
            commentsPage: [],
            allCommentsLoaded: [],
        });
    });

    it('SET_DEFAULT_COMMENT_ON_CHANGE', () => {
        const action: any = {
            type: types.SET_DEFAULT_COMMENT_ON_CHANGE,
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            onChangeComments: [{comment: ''}],
        });
    });

    it('EDIT_COMMENT', () => {
        const action: any = {
            type: types.EDIT_COMMENT,
            payload: {commentId: 1, comment: ''},
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            comments: {
                [action.payload.commentId]: {
                    comment: action.payload.comment,
                },
            },
        });
    });

    it('CHANGE_COMMENT', () => {
        const action: any = {
            type: types.CHANGE_COMMENT,
            payload: {commentId: 1, comment: ''},
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            comments: {
                [action.payload.commentId]: {
                    newComment: action.payload.comment,
                },
            },
        });
    });

    it('DELETE_COMMENT', () => {
        const action: any = {
            type: types.DELETE_COMMENT,
            payload: [],
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            allCommentsId: [],
            comments: {
                [action.payload]: null,
            },
        });
    });

});
