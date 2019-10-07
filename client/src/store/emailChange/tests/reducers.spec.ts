import { changeEmailReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';

describe('Email reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            email: '',
        };
        expect(changeEmailReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('SET_EMAIL_TEXT', () => {
        const action: any = {
            type: types.SET_EMAIL_TEXT,
        };
        expect(changeEmailReducer(defaultState, action)).toEqual({
            ...defaultState,
            email: action.email,
        });
    });
});
