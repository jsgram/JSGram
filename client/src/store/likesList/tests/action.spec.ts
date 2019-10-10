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

describe('Likes List actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should add user like', () => {
        const newsFeed = {
            _id: 'someid',
            description: 'somedesc',
            author: {
                _id: 'someid',
                username: 'someusername',
                photoPath: 'somephotopath',
            },
            comments: [{}],
            tags: [{}],
            authorsOfLike: [{}],
            likeExist: true,
            imgPath: 'somephotopath',
            createdAt: 'somevalue',
        };
        const expectedAction = {
            type: types.GET_LIKE_LIST_SUCCESS,
            payload: newsFeed,
        };
        expect(actions.getLikeListSuccess(newsFeed)).toEqual(expectedAction);
    });

    it('Should set Like list Pending', () => {
        const expectedAction = {
            type: types.GET_LIKE_LIST_PENDING,
        };
        expect(actions.getLikeListPending()).toEqual(expectedAction);
    });

    it('Should get Like List Async', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const likesFeed = {
            feed: {
                loggedId: 'userid',
                loggedUsername: 'Username',
                loggedPhotoPath: 'loggedPhotoPath',
            },
            newsFeed: {
                newsFeed: 'some',
            },
            _id: 'someid',
            description: 'somedecr',
        };
        const expectedActions = [
            actions.getLikeListPending(),
            actions.getLikeListSuccess(likesFeed),
        ];
        store.dispatch(actions.getLikeListAsync())
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
