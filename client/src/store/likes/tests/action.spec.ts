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

describe('Likes actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should add user like', () => {
        const userId = 'someuserid';
        const postId = 'somepostid';
        const expectedAction = {
            type: types.ADD_USER_LIKE,
            payload: {userId, postId},
        };
        expect(actions.addUserLike(userId, postId)).toEqual(expectedAction);
    });

    it('Should set Like Pending', () => {
        const expectedAction = {
            type: types.SET_LIKE_PENDING,
        };
        expect(actions.setLikePending()).toEqual(expectedAction);
    });

    it('Should set post AuthorsOfLike', () => {
        const authorsOfLike = [{
            test: 'somevalue',
        }];
        const expectedAction = {
            type: types.SET_POST_AUTHORS_OF_LIKES,
            payload: authorsOfLike,
        };
        expect(actions.setPostAuthorsOfLike(authorsOfLike)).toEqual(expectedAction);
    });

    it('Should add Like', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const body = {
            userId: 'someuserid',
            postId: 'somepostId',
        };
        const expectedActions = [
            actions.setLikePending(),
            actions.addUserLike(body.userId, body.postId),
        ];
        store.dispatch(actions.addLike(body))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should delete Like', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const body = {
            userId: 'someuserid',
            postId: 'somepostId',
        };
        const expectedActions = [
            actions.setLikePending(),
            actions.removeUserLike(body.userId, body.postId),
        ];
        store.dispatch(actions.deleteLike(body))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
