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

const startState = {};

const mockStore = configureMockStore([thunk]);

const makeMockStore = (state: any = {}): any => (
    mockStore({
        ...startState,
        ...state,
    })
);

describe('Search actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should get Posts Success', () => {
        const users = [{
            photoPath: 'somephotoPath',
            fullName: 'somefullname',
            username: 'someusername',
            _id: 'someid',
        }];
        const expectedAction = {
            type: types.GET_SEARCH_RESULTS_SUCCESS,
            payload: users,
        };
        expect(actions.getSearchResultsSuccess(users)).toEqual(expectedAction);
    });

    it('Should get Search Results Pending', () => {
        const expectedAction = {
            type: types.GET_SEARCH_RESULTS_PENDING,
        };
        expect(actions.getSearchResultsPending()).toEqual(expectedAction);
    });

    it('Should clear Search Results', () => {
        const expectedAction = {
            type: types.CLEAR_SEARCH_RESULTS,
        };
        expect(actions.clearSearchResults()).toEqual(expectedAction);
    });

    it('Should get More Results Success', () => {
        const users = [{
            photoPath: 'somephotoPath',
            fullName: 'somefullname',
            username: 'someusername',
            _id: 'someid',
        }];
        const expectedAction = {
            type: types.GET_MORE_RESULTS_SUCCESS,
            payload: users,
        };
        expect(actions.getMoreResultsSuccess(users)).toEqual(expectedAction);
    });

    it('Should all Results Loaded', () => {
        const expectedAction = {
            type: types.ALL_RESULTS_LOADED,
        };
        expect(actions.allResultsLoaded()).toEqual(expectedAction);
    });

    it('Should clear Loaded', () => {
        const expectedAction = {
            type: types.CLEAR_LOADED,
        };
        expect(actions.clearLoaded()).toEqual(expectedAction);
    });

    it('Should add Next Results', () => {
        const page = 1;
        const expectedAction = {
            type: types.ADD_NEXT_RESULTS,
            payload: page,
        };
        expect(actions.addNextResults(page)).toEqual(expectedAction);
    });

    it('Should getSearchResults', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });
        const users = [{
            photoPath: 'somephotoPath',
            fullName: 'somefullname',
            username: 'someusername',
            _id: 'someid',
        }];
        const expectedActions = [
            actions.getSearchResultsPending(),
            actions.clearLoaded(),
            actions.getSearchResultsSuccess(users),
        ];
        store.dispatch(actions.getSearchResults('somequery', 1))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
