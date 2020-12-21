import { profileEditReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';

describe('ProfileEdit reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            newUsername: '',
            newFullName: '',
        };
        expect(profileEditReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('SET_NEW_USERNAME', () => {
        const action: any = {
            type: types.SET_NEW_USERNAME,
        };
        expect(profileEditReducer(defaultState, action)).toEqual({
            ...defaultState,
            newUsername: action.newUsername,
        });
    });

    it('SET_NEW_FULLNAME', () => {
        const action: any = {
            type: types.SET_NEW_FULLNAME,
        };
        expect(profileEditReducer(defaultState, action)).toEqual({
            ...defaultState,
            newFullName: action.newFullName,
        });
    });
});
