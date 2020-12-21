import { profileReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';

describe('Profile reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            user: {
                posts: 0,
                followers: [],
                following: [],
                description: '',
                fullName: '',
                username: '',
                photo: '',
                subscriptions: {},
                privacy: {},
                email: '',
                _id: '',
            },
            error: '',
            loaded: false,
            loading: false,
            loadFollow: false,
            avatar: null,
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('GET_USER_PENDING', () => {
        const action: any = {
            type: types.GET_USER_PENDING,
            loaded: false,
            error: '',
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
            error: action.error,
        });
    });

    it('GET_USER_SUCCESS', () => {
        const action: any = {
            type: types.GET_USER_SUCCESS,
            loaded: true,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            user: action.payload,
            loaded: action.loaded,
        });
    });

    it('GET_USER_ERROR', () => {
        const action: any = {
            type: types.GET_USER_ERROR,
            loaded: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            error: action.payload,
            loaded: action.loaded,
        });
    });

    it('DELETE_PHOTO_PENDING', () => {
        const action: any = {
            type: types.DELETE_PHOTO_PENDING,
            loading: true,
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: action.loading,
        });
    });

    it('DELETE_PHOTO_SUCCESS', () => {
        const action: any = {
            type: types.DELETE_PHOTO_SUCCESS,
            loading: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            user: {
                ...defaultState.user,
                photo: action.payload,
            },
            loading: action.loading,
        });
    });

    it('DELETE_PHOTO_ERROR', () => {
        const action: any = {
            type: types.DELETE_PHOTO_ERROR,
            loading: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            error: action.payload,
            loading: action.loading,
        });
    });

    it('SET_PHOTO_TO_STATE', () => {
        const action: any = {
            type: types.SET_PHOTO_TO_STATE,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            user: {
                ...defaultState.user,
                photo: action.payload,
            },
        });
    });

    it('CHANGE_SETTINGS_PENDING', () => {
        const action: any = {
            type: types.CHANGE_SETTINGS_PENDING,
            error: '',
            loaded: false,
            loading: true,
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            error: action.error,
            loaded: action.loaded,
            loading: action.loading,
        });
    });

    it('CHANGE_SETTINGS_SUCCESS', () => {
        const action: any = {
            type: types.CHANGE_SETTINGS_SUCCESS,
            loaded: true,
            loading: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            user: {
                ...defaultState.user,
                ...action.payload,
            },
            loaded: action.loaded,
            loading: action.loading,
        });
    });

    it('CHANGE_SETTINGS_ERROR', () => {
        const action: any = {
            type: types.CHANGE_SETTINGS_ERROR,
            loaded: false,
            loading: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            error: action.payload,
            loaded: action.loaded,
            loading: action.loading,
        });
    });

    it('DECREMENT_POST_COUNT', () => {
        const action: any = {
            type: types.DECREMENT_POST_COUNT,
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            user: {
                ...defaultState.user,
                posts: defaultState.user.posts - 1,
            },
        });
    });

    it('UPLOAD_AVATAR_PENDING', () => {
        const action: any = {
            type: types.UPLOAD_AVATAR_PENDING,
            loaded: false,
            error: null,
            loading: true,
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
            error: action.error,
            loading: action.loading,
        });
    });

    it('UPLOAD_AVATAR_SUCCESS', () => {
        const action: any = {
            type: types.UPLOAD_AVATAR_SUCCESS,
            loaded: true,
            loading: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            avatar: action.payload,
            loaded: action.loaded,
            loading: action.loading,
        });
    });

    it('UPLOAD_AVATAR_ERROR', () => {
        const action: any = {
            type: types.UPLOAD_AVATAR_ERROR,
            loaded: false,
            loading: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            error: action.payload,
            loaded: action.loaded,
            loading: action.loading,
        });
    });

    it('UPLOAD_AVATAR_ERROR', () => {
        const action: any = {
            type: types.UPLOAD_AVATAR_ERROR,
            loaded: false,
            loading: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            error: action.payload,
            loaded: action.loaded,
            loading: action.loading,
        });
    });

    it('FOLLOW_USER', () => {
        const action: any = {
            type: types.FOLLOW_USER,
            loadFollow: false,
            payload: [],
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            user: {
                ...defaultState.user,
                followers: action.payload.urlUserFollowers,
            },
            loadFollow: action.loadFollow,
        });
    });

    it('FOLLOW_USER_PENDING', () => {
        const action: any = {
            type: types.FOLLOW_USER_PENDING,
            loadFollow: true,
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            loadFollow: action.loadFollow,
        });
    });

    it('DELETE_USER_PENDING', () => {
        const action: any = {
            type: types.DELETE_USER_PENDING,
            loaded: false,
            error: '',
        };
        expect(profileReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
            error: action.error,
        });
    });
});
