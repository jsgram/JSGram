import { feedReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';
import { SET_LOGGED_USERNAME } from '../actionTypes';

describe('Feed reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            loggedUsername: '',
            loggedId: '',
            loggedPhotoPath: '',
            isAdmin: false,
        };
        expect(feedReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('SET_LOGGED_USERNAME', () => {
        const action: any = {
            type: types.SET_LOGGED_USERNAME,
            payload: {
                loggedId: '',
                loggedUsername: '',
                loggedPhotoPath: '',
                isAdmin: '',
            },
        };
        expect(feedReducer(defaultState, action)).toEqual({
            ...defaultState,
            loggedUsername: action.payload.loggedUsername,
            loggedId: action.payload.loggedId,
            loggedPhotoPath: action.payload.loggedPhotoPath,
            isAdmin: action.payload.isAdmin,
        });
    });
});
