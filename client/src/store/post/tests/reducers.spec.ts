import { postReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';
import {
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    GET_MORE_POSTS_SUCCESS,
    ALL_POSTS_LOADED,
    CLEAR_LOADED,
    DELETE_POST_PENDING,
    DELETE_POST_SUCCESS,
    SHOW_SELECTED_POST,
    NEW_DESCRIPTION_FOR_POST,
    EDIT_DESCRIPTION_FOR_POST,
    UPLOAD_NEXT_POSTS,
    ADD_USER_LIKE_TO_SELECTED_POST,
    REMOVE_USER_LIKE_FROM_SELECTED_POST,
} from '../actionTypes';

describe('Post reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
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
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('GET_POSTS_PENDING', () => {
        const action: any = {
            type: types.GET_POSTS_PENDING,
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: true,
        });
    });

    it('GET_POSTS_SUCCESS', () => {
        const action: any = {
            type: types.GET_POSTS_SUCCESS,
            payload: [],
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            posts: action.payload,
            loading: false,
        });
    });

    it('GET_MORE_POSTS_SUCCESS', () => {
        const action: any = {
            type: types.GET_MORE_POSTS_SUCCESS,
            payload: [],
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            posts: [...action.payload],
            loading: false,
        });
    });
    it('ALL_POSTS_LOADED', () => {
        const action: any = {
            type: types.ALL_POSTS_LOADED,
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: true,
            loading: false,
        });
    });
    it('CLEAR_LOADED', () => {
        const action: any = {
            type: types.CLEAR_LOADED,
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: false,
        });
    });

    it('DELETE_POST_PENDING', () => {
        const action: any = {
            type: types.DELETE_POST_PENDING,
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: false,
            loading: true,
        });
    });
    it('DELETE_POST_SUCCESS', () => {
        const action: any = {
            type: types.DELETE_POST_SUCCESS,
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            posts: [],
            loaded: true,
            loading: false,
        });
    });

    it('SHOW_SELECTED_POST', () => {
        const action: any = {
            type: types.SHOW_SELECTED_POST,
            payload: {},
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            selectedPost: action.payload,
        });
    });

    it('NEW_DESCRIPTION_FOR_POST', () => {
        const action: any = {
            type: types.NEW_DESCRIPTION_FOR_POST,
            payload: {description: ''},
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            selectedPost: {
                newDescription: action.payload.description,
            },
            posts: [],
        });
    });

    it('EDIT_DESCRIPTION_FOR_POST', () => {
        const action: any = {
            type: types.EDIT_DESCRIPTION_FOR_POST,
            payload: {description: ''},
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            selectedPost: {
                description: action.payload.description,
            },
            posts: [],
        });
    });

    it('UPLOAD_NEXT_POSTS', () => {
        const action: any = {
            type: types.UPLOAD_NEXT_POSTS,
            payload: 1,
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            page: action.payload,
        });
    });

    it('ADD_USER_LIKE_TO_SELECTED_POST', () => {
        const action: any = {
            type: types.ADD_USER_LIKE_TO_SELECTED_POST,
            payload: 1,
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            selectedPost: {},
            posts: [],
        });
    });

    it('REMOVE_USER_LIKE_FROM_SELECTED_POST', () => {
        const action: any = {
            type: types.REMOVE_USER_LIKE_FROM_SELECTED_POST,
        };
        expect(postReducer(defaultState, action)).toEqual({
            ...defaultState,
            selectedPost: {},
            posts: [],
        });
    });
});
