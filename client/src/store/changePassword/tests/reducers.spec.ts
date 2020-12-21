import { changePasswordReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';

describe('changePassword reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            password: '',
            error: '',
            loaded: false,
            loading: false,
        };
        expect(changePasswordReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('CHANGE_PASSWORD_PENDING', () => {
        const action: any = {
            type: types.CHANGE_PASSWORD_PENDING,
            loaded: false,
            loading: true,
            error: '',
        };
        expect(changePasswordReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
            loading: action.loading,
            error: action.error,
        });
    });

    it('CHANGE_PASSWORD_SUCCESS', () => {
        const action: any = {
            type: types.CHANGE_PASSWORD_SUCCESS,
            loaded: true,
            loading: false,
        };
        expect(changePasswordReducer(defaultState, action)).toEqual({
            ...defaultState,
            password: action.password,
            loaded: action.loaded,
            loading: action.loading,
        });
    });

    it('CHANGE_PASSWORD_ERROR', () => {
        const action: any = {
            type: types.CHANGE_PASSWORD_ERROR,
            loaded: false,
            loading: false,
        };
        expect(changePasswordReducer(defaultState, action)).toEqual({
            ...defaultState,
            error: action.error,
            loaded: action.loaded,
            loading: action.loading,
        });
    });
});
