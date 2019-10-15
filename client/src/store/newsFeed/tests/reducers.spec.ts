import { newsFeedReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';

describe('NewsFeed reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            feed: [
                {
                    description: '',
                    comments: [],
                    tags: [],
                    authorsOfLike: [],
                    likeExist: false,
                    _id: '',
                    imgPath: '',
                    author: {
                        photoPath: '',
                        _id: '',
                        username: '',
                    },
                    createdAt: '',
                },
            ],
            page: 1,
            feedLoaded: false,
            feedLoading: false,
            friendsRecommendations: {
                users: [],
                loading: false,
            },
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('GET_NEWS_FEED_PENDING', () => {
        const action: any = {
            type: types.GET_NEWS_FEED_PENDING,
            feedLoading: true,
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
            feedLoading: action.feedLoading,
        });
    });

    it('GET_NEWS_FEED_SUCCESS', () => {
        const action: any = {
            type: types.GET_NEWS_FEED_SUCCESS,
            feedLoading: false,
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
            feed: action.feed,
            feedLoading: action.feedLoading,
        });
    });

    it('GET_MORE_NEWS_FEED_SUCCESS', () => {
        const action: any = {
            type: types.GET_MORE_NEWS_FEED_SUCCESS,
            feedLoading: false,
            payload: [],
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
            feed: [...defaultState.feed, ...action.payload],
            feedLoading: action.feedLoading,
        });
    });

    it('ALL_NEWS_FEED_LOADED', () => {
        const action: any = {
            type: types.ALL_NEWS_FEED_LOADED,
            feedLoaded: true,
            feedLoading: false,
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
            feedLoaded: action.feedLoaded,
            feedLoading: action.feedLoading,
        });
    });

    it('CLEAR_NEWS_FEED_LOADED', () => {
        const action: any = {
            type: types.CLEAR_NEWS_FEED_LOADED,
            feedLoaded: false,
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
            feedLoaded: action.feedLoaded,
        });
    });

    it('UPLOAD_NEXT_FEED_POSTS', () => {
        const action: any = {
            type: types.UPLOAD_NEXT_FEED_POSTS,
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
            page: action.payload + 1,
        });
    });

    it('GET_RECOMMENDATIONS_PENDING', () => {
        const action: any = {
            type: types.GET_RECOMMENDATIONS_PENDING,
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
            friendsRecommendations: {
                ...defaultState.friendsRecommendations,
                loading: true,
            },
        });
    });

    it('GET_RECOMMENDATIONS_SUCCESS', () => {
        const action: any = {
            type: types.GET_RECOMMENDATIONS_SUCCESS,
            payload: [],
        };
        expect(newsFeedReducer(defaultState, action)).toEqual({
            ...defaultState,
            friendsRecommendations: {
                ...defaultState.friendsRecommendations,
                users: [],
                loading: false,
            },
        });
    });
});
