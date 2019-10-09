import { loginReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';

describe('Login reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            user: {
                posts: 0,
                followers: 0,
                following: 0,
                description: '',
                fullName: '',
                username: '',
                photo: '',
                email: '',
                _id: '',
            },
            error: '',
            loaded: false,
            loading: false,
        };
        expect(loginReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('GET_USER_PENDING', () => {
        const action: any = {
            type: types.GET_USER_PENDING,
            loaded: false,
            error: '',
        };
        expect(loginReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
            error: action.error,
        });
    });

    it('GET_USER_SUCCESS', () => {
        const action: any = {
            type: types.GET_USER_SUCCESS,
            loaded: true,
        };
        expect(loginReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
            user: action.user,
        });
    });

    it('GET_USER_ERROR', () => {
        const action: any = {
            type: types.GET_USER_ERROR,
            loaded: false,
        };
        expect(loginReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
            error: action.error,
        });
    });
});
