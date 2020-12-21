import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import { showAlert } from '../../alert/actions';
import { checkEmail } from '../actions';

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

    it('dispatches checkEmail with server data on success', () => {
        const store = makeMockStore();
        const successMock = (): { status: number } => ({status: 200});
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(successMock());
        });

        const expected = [
            showAlert('Good', 'success'),
        ];
        store.dispatch(checkEmail('art256100@gmail.com'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            })
            .catch((err: Error): Error => err);
    });

    it('dispatches checkEmail with server data on error', () => {
        const store = makeMockStore();
        const errorMock = (): { status: number } => ({status: 409});
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(errorMock());
        });

        const expected = [
            showAlert(
                'The email address you have entered isn\'t associated with another account',
                'danger',
            ),
        ];
        store.dispatch(checkEmail('hgfjhfchjkbx'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expected);
            })
            .catch((err: Error): Error => err);
    });
});
