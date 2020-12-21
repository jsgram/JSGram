import * as actions from '../actions';
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

    it('Should change our email', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const expectedActions = [
            showAlert('', 'success'),
        ];
        store.dispatch(actions.changeEmail({}, 'new email'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
