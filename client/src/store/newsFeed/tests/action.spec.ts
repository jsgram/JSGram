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

const startState = {};

const mockStore = configureMockStore([thunk]);

const makeMockStore = (state: any = {}): any => (
    mockStore({
        ...startState,
        ...state,
    })
);

describe('NewsFeed actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Should get News Feed Success', () => {
        const newsFeed = {
            _id: 'someid',
            description: 'somedesc',
            author: {
                _id: 'someid',
                username: 'someusername',
                photoPath: 'somephotopath',
            },
        };
        const expectedAction = {
            type: types.GET_NEWS_FEED_SUCCESS,
            payload: newsFeed,
        };
        expect(actions.getNewsFeedSuccess(newsFeed)).toEqual(expectedAction);
    });

    it('Should get news feed pending', () => {
        const expectedAction = {
            type: types.GET_NEWS_FEED_PENDING,
        };
        expect(actions.getNewsFeedPending()).toEqual(expectedAction);
    });

    it('Should all news feed loaded', () => {
        const expectedAction = {
            type: types.ALL_NEWS_FEED_LOADED,
        };
        expect(actions.allNewsFeedLoaded()).toEqual(expectedAction);
    });

    it('Should get Recommendations Pending', () => {
        const expectedAction = {
            type: types.GET_RECOMMENDATIONS_PENDING,
        };
        expect(actions.getRecommendationsPending()).toEqual(expectedAction);
    });

    it('Should get news feed Async', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const newsFeed = {
            feed: {
                loggedId: 'userid',
                loggedUsername: 'Username',
                loggedPhotoPath: 'loggedPhotoPath',
            },
            newsFeed: {
                newsFeed: 'some',
            },
        };
        const expectedActions = [
            actions.getNewsFeedPending(),
            actions.getNewsFeedSuccess(newsFeed),
            actions.clearNewsFeedLoaded(),
        ];
        store.dispatch(actions.getNewsFeedAsync())
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should get recommendations Async', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const friendsRecommendations = {
            users: [],
            loading: false,
        };
        const expectedActions = [
            actions.getRecommendationsPending(),
            actions.getRecommendationsSuccess(friendsRecommendations),
        ];
        store.dispatch(actions.getRecommendations())
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });

    it('Should get posts by tag Async', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            moxios.requests.mostRecent();
        });

        const posts = {
            _id: 'someid',
            imgPath: 'someimgPath',
            author: 'someauthor',
            description: 'somedescr',
            tags: [],
        };
        const expectedActions = [
            actions.getNewsFeedPending(),
            actions.getNewsFeedSuccess(posts),
            actions.clearNewsFeedLoaded(),
        ];
        store.dispatch(actions.getPostsByTagAsync('sometag'))
            .then(() => {
                const actual = store.getActions();
                expect(actual).toEqual(expectedActions);
            })
            .catch((err: Error): Error => err);
    });
});
