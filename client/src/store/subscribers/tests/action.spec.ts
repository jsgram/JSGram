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
import {GET_SEARCH_RESULTS_SUCCESS} from "../actionTypes";
import {GET_SEARCH_RESULTS_PENDING} from "../actionTypes";
import {CLEAR_SEARCH_RESULTS} from "../actionTypes";
import {GET_MORE_RESULTS_SUCCESS} from "../actionTypes";
import {ADD_NEXT_RESULTS} from "../actionTypes";
import {getSearchResultsPending} from "../actions";
import {getSearchResultsSuccess} from "../actions";
import {SET_SUBSCRIBERS_PENDING} from "../actionTypes";
import {SET_SUBSCRIBERS} from "../actionTypes";
import {ALL_SUBSCRIBERS_LOADED} from "../actionTypes";
import {SET_SUBSCRIBERS_COUNT} from "../actionTypes";
import {RESET_SUBSCRIBERS} from "../actionTypes";
import {CHANGE_USER_FOLLOWING} from "../actionTypes";
import {setSubscribersPending} from "../actions";
import {allSubscribersLoaded} from "../actions";

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
