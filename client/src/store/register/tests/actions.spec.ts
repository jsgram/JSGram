import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import {showAlert} from '../../alert/actions';
import {registerUser} from '../actions';
import {reset} from 'redux-form';

export const startState = {};

export const mockStore = configureMockStore([thunk]);

export const makeMockStore = (state: any = {}): any => {
    return mockStore({
        ...startState,
        ...state,
    });
};

const mockSuccess = (data: any): any => ({status: 200, response: {data}});

describe('registerUser', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches registerUser with server data on success', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
        });

        const user = {
            fullName: 'test test',
            username: 'sdgsdhdhsdf',
            email: 'testtest123324235@test.com',
            password: 'testtest',
        };

        const expected = [
            showAlert('Welcome', 'success'),
            reset('registerForm'),
        ];
        store.dispatch(registerUser(user))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            });
    });

    it('dispatches registerUser with server data on error', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
        });

        const user = {};

        const expected = [
            showAlert('Can not create user', 'danger'),
        ];
        store.dispatch(registerUser(user))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            });
    });
});
