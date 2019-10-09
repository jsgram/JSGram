import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import { showAlert } from '../../alert/actions';
import { changePassword } from '../actions';

export const startState = {};

export const mockStore = configureMockStore([thunk]);

export const makeMockStore = (state: any = {}): any => (
    mockStore({
        ...startState,
        ...state,
    })
);

describe('Check email', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches changePassword with server data on success', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const expected = [
            showAlert('', 'success'),
        ];
        store.dispatch(changePassword('test123123', '9db4777228fe704ce4527edab89e6bc5'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            })
            .catch((err: Error): Error => err);
    });

    it('dispatches changePassword with server data on error', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const expected = [
            showAlert(
                'Token does not exist',
                'danger',
            ),
        ];
        store.dispatch(changePassword('hgfjhfchjkbx', 'jksdhfksjhfks'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            })
            .catch((err: Error): Error => err);
    });
});
