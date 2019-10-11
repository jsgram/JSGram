import * as actions from './actions';
import { ADD_NEW_NOTIFICATION, ADD_NEW_ROOM } from './notificationsConfig';
import configureMockStore from 'redux-mock-store';
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

describe('Notifications actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should get joinRoomNotificationSocket', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const expectedActions = [
            ADD_NEW_ROOM,
        ];
        store.dispatch(actions.joinRoomNotificationSocket('someid'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should get emitNewNotificationSocket', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const expectedActions = [
            ADD_NEW_NOTIFICATION,
        ];
        store.dispatch(actions.emitNewNotificationSocket('someid', 'someuser', 'somemessage'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
