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

describe('Post actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should get Posts Success', () => {
        const posts = {
            _id: 'someid',
            imgPath: 'someimgPath',
            author: 'someauthor',
            description: 'somedescr',
            tags: [],
        };
        const expectedAction = {
            type: types.GET_POSTS_SUCCESS,
            payload: posts,
        };
        expect(actions.getPostsSuccess(posts)).toEqual(expectedAction);
    });

    it('Should get Posts Pending', () => {
        const expectedAction = {
            type: types.GET_POSTS_PENDING,
        };
        expect(actions.getPostsPending()).toEqual(expectedAction);
    });

    it('Should all Posts Loaded', () => {
        const expectedAction = {
            type: types.ALL_POSTS_LOADED,
        };
        expect(actions.allPostsLoaded()).toEqual(expectedAction);
    });

    it('Should clear Loaded', () => {
        const expectedAction = {
            type: types.CLEAR_LOADED,
        };
        expect(actions.clearLoaded()).toEqual(expectedAction);
    });

    it('Should delete Post Pending', () => {
        const expectedAction = {
            type: types.DELETE_POST_PENDING,
        };
        expect(actions.deletePostPending()).toEqual(expectedAction);
    });

    it('Should delete Posts Success', () => {
        const postId = 'somepostid';
        const expectedAction = {
            type: types.DELETE_POST_SUCCESS,
            payload: postId,
        };
        expect(actions.deletePostSuccess(postId)).toEqual(expectedAction);
    });

    it('Should new Description for Post', () => {
        const postId = 'somepostid';
        const description = 'somedescr';
        const expectedAction = {
            type: types.NEW_DESCRIPTION_FOR_POST,
            payload: {description, postId},
        };
        expect(actions.newDescriptionForPost(description, postId)).toEqual(expectedAction);
    });

    it('Should edit Description for Post', () => {
        const postId = 'somepostid';
        const description = 'somedescr';
        const expectedAction = {
            type: types.EDIT_DESCRIPTION_FOR_POST,
            payload: {description, postId},
        };
        expect(actions.editDescriptionForPost(description, postId)).toEqual(expectedAction);
    });

    it('Should edit Description for Post', () => {
        const page = 2;
        const expectedAction = {
            type: types.UPLOAD_NEXT_POSTS,
            payload: page,
        };
        expect(actions.addNextPosts(page)).toEqual(expectedAction);
    });

    it('Should add user like to selected post', () => {
        const loggedId = 'someloggedId';
        const postId = 'somepostid';
        const expectedAction = {
            type: types.ADD_USER_LIKE_TO_SELECTED_POST,
            payload: {loggedId, postId},
        };
        expect(actions.addUserLikeToSelectedPost(loggedId, postId)).toEqual(expectedAction);
    });

    it('Should get Posts Async', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const expectedActions = [
            actions.resetPosts(),
            actions.getPostsPending(),
            actions.clearLoaded(),
        ];
        store.dispatch(actions.getPostsAsync('someusername'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should delete Post', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });
        const postId = 'somepostid';
        const authorId = 'someauthorId';
        const expectedActions = [
            actions.deletePostPending(),
            actions.deletePostSuccess(postId),
        ];
        store.dispatch(actions.deletePost(postId, authorId))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
