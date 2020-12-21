import * as actions from '../actions';
import * as types from '../actionTypes';
import configureMockStore from 'redux-mock-store';
import { showAlert } from '../../alert/actions';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const startState = {};

const mockStore = configureMockStore([thunk]);

const makeMockStore = (state: any = {}): any => (
    mockStore({
        ...startState,
        ...state,
    })
);

describe('Async actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should edit our profile', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const expectedActions = [
            actions.setUsername('username'),
            showAlert('', 'success'),
        ];
        store.dispatch(actions.editProfile({username: 'volodia'}))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should set username', () => {
        const newUsername = 'volodia';
        const expectedActions = {
            type: types.SET_NEW_USERNAME,
            payload: newUsername,
        };
        expect(actions.setUsername(newUsername)).toEqual(expectedActions);
    });

    it('Should set fullname', () => {
        const fullName = 'petrenko';
        const expectedActions = {
            type: types.SET_NEW_FULLNAME,
            payload: fullName,
        };
        expect(actions.setFullName(fullName)).toEqual(expectedActions);
    });
});
