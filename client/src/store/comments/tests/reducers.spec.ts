import { commentsReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';
import {GET_COMMENTS_PENDING} from "../actionTypes";
import {ALL_COMMENTS_LOADED} from "../actionTypes";
import {RESET_COMMENTS} from "../actionTypes";
import {SET_DEFAULT_COMMENT_ON_CHANGE} from "../actionTypes";
import {ON_CHANGE_COMMENT} from "../actionTypes";
import {ADD_COMMENT} from "../actionTypes";
import {EDIT_COMMENT} from "../actionTypes";
import {CHANGE_COMMENT} from "../actionTypes";
import {DELETE_COMMENT} from "../actionTypes";


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
            comments: [...action.payload.comments],
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
            comments: [],
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
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            comments: [],
        });
    });

    it('CHANGE_COMMENT', () => {
        const action: any = {
            type: types.CHANGE_COMMENT,
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            comments: [],
        });
    });

    it('DELETE_COMMENT', () => {
        const action: any = {
            type: types.DELETE_COMMENT,
        };
        expect(commentsReducer(defaultState, action)).toEqual({
            ...defaultState,
            comments: [],
        });
    });

});
