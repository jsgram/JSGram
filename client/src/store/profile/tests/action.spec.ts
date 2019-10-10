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
        const user = {
            posts: 1,
            description: 'somedesc',
            fullName: 'somefullname',
            username: 'someusername',
            photo: 'somephoto',
            email: 'someemail',
            _id: 'someid',
            followers: [],
            following: [],
            getPostsAsync: jest.fn(() => 'somevalue'),
        };
        const expectedAction = {
            type: types.GET_USER_SUCCESS,
            payload: user,
        };
        expect(actions.getUserSuccess(user)).toEqual(expectedAction);
    });

    it('Should get User Error', () => {
        const error = {
            name: 'somecolor',
            message: 'somemessage',
            stack: 'somevalue',
        };
        const expectedAction = {
            type: types.GET_USER_ERROR,
            payload: error,
        };
        expect(actions.getUserError(error)).toEqual(expectedAction);
    });

    it('Should delete Photo Pending', () => {
        const expectedAction = {
            type: types.DELETE_PHOTO_PENDING,
        };
        expect(actions.deletePhotoPending()).toEqual(expectedAction);
    });

    it('Should delete Photo Success', () => {
        const photoPath = 'somephotopath';
        const expectedAction = {
            type: types.DELETE_PHOTO_SUCCESS,
            payload: photoPath,
        };
        expect(actions.deletePhotoSuccess(photoPath)).toEqual(expectedAction);
    });

    it('Should upload Avatar Pending', () => {
        const expectedAction = {
            type: types.UPLOAD_AVATAR_PENDING,
        };
        expect(actions.uploadAvatarPending()).toEqual(expectedAction);
    });

    it('Should upload Avatar Success', () => {
        const avatar = 'someavatar';
        const expectedAction = {
            type: types.UPLOAD_AVATAR_SUCCESS,
            payload: avatar,
        };
        expect(actions.uploadAvatarSuccess(avatar)).toEqual(expectedAction);
    });

    it('Should decrement Post Count', () => {
        const expectedAction = {
            type: types.DECREMENT_POST_COUNT,
        };
        expect(actions.decrementPostCount()).toEqual(expectedAction);
    });

    it('Should upload Post Avatar Async', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });
        const photoPath = 'photoPath';
        const expectedActions = [
            actions.uploadAvatarPending(),
            actions.uploadAvatarSuccess(photoPath),
            actions.setPhotoToState(photoPath),
        ];
        store.dispatch(actions.uploadPostAvatar('somecroppedImage'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should follow User', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });
        const postId = 'somepostid';
        const loggedId = 'someloggedId';
        const followers = 'somevalue';
        const expectedActions = [
            actions.followUserPending(),
            actions.addFollowUser(loggedId, followers),
        ];
        store.dispatch(actions.followUser(postId))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should delete User', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });
        const postId = 'somepostid';
        const expectedActions = [
            actions.deleteUserPending(),
        ];
        store.dispatch(actions.deleteUser(postId))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
