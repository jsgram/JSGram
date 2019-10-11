import { likesReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';
import {SET_LIKE_PENDING} from "../actionTypes";
import {SET_POST_AUTHORS_OF_LIKES} from "../actionTypes";
import {SET_FEED_AUTHORS_OF_LIKES} from "../actionTypes";
import {CHECK_LOGGED_USER_LIKE_EXIST} from "../actionTypes";
import {ADD_USER_LIKE} from "../actionTypes";
import {REMOVE_USER_LIKE} from "../actionTypes";

describe('Like reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            postAuthorsOfLike: [],
            feedAuthorsOfLike: [],
            loadingLike: false,
            loggedUserLikeExist: false,
        };
        expect(likesReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('SET_LIKE_PENDING', () => {
        const action: any = {
            type: types.SET_LIKE_PENDING,
        };
        expect(likesReducer(defaultState, action)).toEqual({
            ...defaultState,
            loadingLike: true,
        });
    });

    it('SET_POST_AUTHORS_OF_LIKES', () => {
        const action: any = {
            type: types.SET_POST_AUTHORS_OF_LIKES,
            payload: {},
        };
        expect(likesReducer(defaultState, action)).toEqual({
            ...defaultState,
            postAuthorsOfLike: action.payload,
            loadingLike: false,
        });
    });

    it('SET_FEED_AUTHORS_OF_LIKES', () => {
        const action: any = {
            type: types.SET_FEED_AUTHORS_OF_LIKES,
            payload: {},
        };
        expect(likesReducer(defaultState, action)).toEqual({
            ...defaultState,
            feedAuthorsOfLike: [action.payload],
            loadingLike: false,
        });
    });

    it('CHECK_LOGGED_USER_LIKE_EXIST', () => {
        const action: any = {
            type: types.CHECK_LOGGED_USER_LIKE_EXIST,
            payload: false,
        };
        expect(likesReducer(defaultState, action)).toEqual({
            ...defaultState,
            loggedUserLikeExist: action.payload,
        });
    });

    it('ADD_USER_LIKE', () => {
        const action: any = {
            type: types.ADD_USER_LIKE,
            payload: {userId: 'test'},
        };
        expect(likesReducer(defaultState, action)).toEqual({
            ...defaultState,
            postAuthorsOfLike: [action.payload.userId],
            feedAuthorsOfLike: [],
            loadingLike: false,
        });
    });

    it('REMOVE_USER_LIKE', () => {
        const action: any = {
            type: types.REMOVE_USER_LIKE,
        };
        expect(likesReducer(defaultState, action)).toEqual({
            ...defaultState,
            postAuthorsOfLike: [],
            feedAuthorsOfLike: [],
            loadingLike: false,
        });
    });
});
