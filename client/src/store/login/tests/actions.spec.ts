import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import {showAlert} from '../../alert/actions';
import {getUserError, getUserPending, getUserSuccess, loginUser} from '../actions';

export const startState = {};

export const mockStore = configureMockStore([thunk]);

export const makeMockStore = (state: any = {}): any => {
    return mockStore({
        ...startState,
        ...state,
    });
};

const mockSuccess = (data: any): any => ({status: 200, response: {data}});

describe('loginUser', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches loginUser with server data on success', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
        });

        const user = {
            email: 'lol@lol.ua',
            password: 'lollollol',
        };

        const expected = [
            showAlert('Welcome', 'success'),
            getUserPending(),
            getUserSuccess(user),
        ];
        store.dispatch(loginUser(user))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            })
        ;
    });

    it('dispatches loginUser with server data on error', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
        });

        const user = {};
        const err = new Error();

        const expected = [
            showAlert(
                'The email address you have entered isn\'t associated with another account',
                'danger',
            ),
        ];
        store.dispatch(loginUser(user))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            });
    });
});
