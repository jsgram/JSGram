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

describe('Comments actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should all comments loaded', () => {
        const page = 1;
        const postId = 'somepostid';
        const expectedAction = {
            type: types.ALL_COMMENTS_LOADED,
            payload: {postId, page},
        };
        expect(actions.allCommentsLoaded(postId, page)).toEqual(expectedAction);
    });

    it('Should reset comments', () => {
        const expectedAction = {
            type: types.RESET_COMMENTS,
        };
        expect(actions.resetComments()).toEqual(expectedAction);
    });

    it('Should set Default Comment To Change', () => {
        const postId = 'somepostid';
        const expectedAction = {
            type: types.SET_DEFAULT_COMMENT_ON_CHANGE,
            payload: postId,
        };
        expect(actions.setDefaultCommentToChange(postId)).toEqual(expectedAction);
    });

    it('Should add new comment', () => {
        const newComment = {
            postId: 'someId',
        };
        const expectedAction = {
            type: types.ADD_COMMENT,
            payload: newComment,
        };
        expect(actions.addNewComment(newComment)).toEqual(expectedAction);
    });

    it('Should add Comment', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const res = 'somevalue';
        const postId = 'somepostId';
        const expectedActions = [
            actions.addNewComment(res),
            actions.resetComment(postId),
        ];
        store.dispatch(actions.addComment('somepostId', 'someauthorId', 'somecomment'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
