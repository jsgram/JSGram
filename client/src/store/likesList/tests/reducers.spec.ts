import { likeListReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';
import {
    GET_LIKE_LIST_PENDING,
    GET_LIKE_LIST_SUCCESS,
    ALL_LIKE_LIST_LOADED,
    CLEAR_LIKE_LIST_LOADED,
    UPLOAD_NEXT_LIKE_LIST,
} from '../actionTypes';

describe('LikeList reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            feed: [
                {
                    description: '',
                    comments: [],
                    tags: [],
                    authorsOfLike: [],
                    likeExist: false,
                    _id: '',
                    imgPath: '',
                    author: {
                        photoPath: '',
                        _id: '',
                        username: '',
                    },
                    createdAt: '',
                },
            ],
            page: 1,
            feedLoaded: false,
            feedLoading: false,
            friendsRecommendations: {
                users: [],
                loading: false,
            },
        };
        expect(likeListReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('GET_LIKE_LIST_PENDING', () => {
        const action: any = {
            type: types.GET_LIKE_LIST_PENDING,
        };
        expect(likeListReducer(defaultState, action)).toEqual({
            ...defaultState,
            feedLoading: true,
        });
    });

    it('GET_LIKE_LIST_SUCCESS', () => {
        const action: any = {
            type: types.GET_LIKE_LIST_SUCCESS,
            payload: [],
        };
        expect(likeListReducer(defaultState, action)).toEqual({
            ...defaultState,
            feed: action.payload,
            feedLoading: false,
        });
    });

    it('ALL_LIKE_LIST_LOADED', () => {
        const action: any = {
            type: types.ALL_LIKE_LIST_LOADED,
        };
        expect(likeListReducer(defaultState, action)).toEqual({
            ...defaultState,
            feedLoaded: true,
            feedLoading: false,
        });
    });
    it('CLEAR_LIKE_LIST_LOADED', () => {
        const action: any = {
            type: types.CLEAR_LIKE_LIST_LOADED,
        };
        expect(likeListReducer(defaultState, action)).toEqual({
            ...defaultState,
            feedLoaded: false,
        });
    });
    it('UPLOAD_NEXT_LIKE_LIST', () => {
        const action: any = {
            type: types.UPLOAD_NEXT_LIKE_LIST,
            payload: 1,
        };
        expect(likeListReducer(defaultState, action)).toEqual({
            ...defaultState,
            page: action.payload + 1,
        });
    });
});
