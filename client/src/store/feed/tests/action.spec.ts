import * as actions from '../actions';
import * as types from '../actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {SET_LOGGED_USERNAME} from "../actionTypes";
import {setLoggedUsername} from "../actions";

const startState = {};

const mockStore = configureMockStore([thunk]);

const makeMockStore = (state: any = {}): any => (
    mockStore({
        ...startState,
        ...state,
    })
);

describe('Comments actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should set Logged Username', () => {
        const loggedId = 'userId';
        const loggedUsername = 'username';
        const loggedPhotoPath = 'loggedphotopath';
        const isAdmin = false;
        const expectedAction = {
            type: types.SET_LOGGED_USERNAME,
            payload: {
                loggedId,
                loggedUsername,
                loggedPhotoPath,
                isAdmin,
            },
        };
        expect(actions.setLoggedUsername(
            loggedId,
            loggedUsername,
            loggedPhotoPath,
            isAdmin,
        )).toEqual(expectedAction);
    });

    it('Should get user info from token', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const userId = 'somevalue';
        const username = 'someusername';
        const photoPath = 'somephotoPath';
        const isAdmin = false;
        const expectedActions = [
            actions.setLoggedUsername(userId, username, photoPath, isAdmin),
        ];
        store.dispatch(actions.getUserInfoFromToken())
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
