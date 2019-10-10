import * as actions from '../actions';
import * as types from '../actionTypes';
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

describe('set Subscribers actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should get Posts Success', () => {
        const subscribers = [{
            test: 'sometest',
        }];
        const loggedId = 'someloggedId';
        const page = 1;
        const expectedAction = {
            type: types.SET_SUBSCRIBERS,
            payload: {loggedId, subscribers, page},
        };
        expect(actions.setSubscribers(loggedId, subscribers, page)).toEqual(expectedAction);
    });

    it('Should set Subscribers Pending', () => {
        const expectedAction = {
            type: types.SET_SUBSCRIBERS_PENDING,
        };
        expect(actions.setSubscribersPending()).toEqual(expectedAction);
    });

    it('Should all Subscribers Loaded', () => {
        const expectedAction = {
            type: types.ALL_SUBSCRIBERS_LOADED,
        };
        expect(actions.allSubscribersLoaded()).toEqual(expectedAction);
    });

    it('Should set Subscribers Count', () => {
        const followersCount = 1;
        const followingCount = 1;
        const expectedAction = {
            type: types.SET_SUBSCRIBERS_COUNT,
            payload: {followersCount, followingCount},
        };
        expect(actions.setSubscribersCount(followersCount, followingCount)).toEqual(expectedAction);
    });

    it('Should reset Subscribers', () => {
        const expectedAction = {
            type: types.RESET_SUBSCRIBERS,
        };
        expect(actions.resetSubscribers()).toEqual(expectedAction);
    });

    it('Should change Following', () => {
        const userId = 'someuserid';
        const followType = 'somefollowType';
        const expectedAction = {
            type: types.CHANGE_USER_FOLLOWING,
            payload: {userId, followType},
        };
        expect(actions.changeFollowing(userId, followType)).toEqual(expectedAction);
    });

    it('Should get Subscribers', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });
        const expectedActions = [
            actions.setSubscribersPending(),
            actions.allSubscribersLoaded(),
        ];
        store.dispatch(actions.getSubscribers('someloggeid', 'somesubscr', 'someuser', 1))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
