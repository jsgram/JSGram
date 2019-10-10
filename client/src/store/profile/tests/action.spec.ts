import * as actions from '../actions';
import * as types from '../actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {GET_LIKE_LIST_PENDING} from "../actionTypes";
import {GET_LIKE_LIST_SUCCESS} from "../actionTypes";
import {getLikeListPending} from "../actions";
import {getLikeListSuccess} from "../actions";
import {GET_NEWS_FEED_SUCCESS} from "../actionTypes";
import {GET_NEWS_FEED_PENDING} from "../actionTypes";
import {ALL_NEWS_FEED_LOADED} from "../actionTypes";
import {getNewsFeedPending} from "../actions";
import {getNewsFeedSuccess} from "../actions";
import {clearNewsFeedLoaded} from "../actions";
import {getRecommendationsPending} from "../actions";
import {getRecommendationsSuccess} from "../actions";
import {GET_RECOMMENDATIONS_PENDING} from "../actionTypes";
import {GET_POSTS_PENDING} from "../actionTypes";
import {GET_POSTS_SUCCESS} from "../actionTypes";
import {ALL_POSTS_LOADED} from "../actionTypes";
import {CLEAR_LOADED} from "../actionTypes";
import {DELETE_POST_PENDING} from "../actionTypes";
import {DELETE_POST_SUCCESS} from "../actionTypes";
import {EDIT_DESCRIPTION_FOR_POST} from "../actionTypes";
import {UPLOAD_NEXT_POSTS} from "../actionTypes";
import {ADD_USER_LIKE_TO_SELECTED_POST} from "../actionTypes";
import {resetPosts} from "../actions";
import {getPostsPending} from "../actions";
import {getPostsSuccess} from "../actions";
import {clearLoaded} from "../actions";
import {deletePostPending} from "../actions";
import {deletePostSuccess} from "../actions";
import {decrementPostCount} from "../../profile/actions";
import {NEW_DESCRIPTION_FOR_POST} from "../actionTypes";
import {GET_USER_PENDING} from "../actionTypes";
import {GET_USER_SUCCESS} from "../actionTypes";
import {GET_USER_ERROR} from "../actionTypes";
import {DELETE_PHOTO_PENDING} from "../actionTypes";
import {DELETE_PHOTO_SUCCESS} from "../actionTypes";
import {UPLOAD_AVATAR_PENDING} from "../actionTypes";
import {DECREMENT_POST_COUNT} from "../actionTypes";
import {uploadAvatarPending} from "../actions";
import {uploadAvatarSuccess} from "../actions";
import {setPhotoToState} from "../actions";
import {followUserPending} from "../actions";
import {addFollowUser} from "../actions";
import {deleteUserPending} from "../actions";

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
