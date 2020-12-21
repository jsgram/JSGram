import { subscribersReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';
import {
    SET_SUBSCRIBERS_PENDING,
    SET_SUBSCRIBERS_COUNT,
    ALL_SUBSCRIBERS_LOADED,
    RESET_SUBSCRIBERS,
} from '../actionTypes';

describe('Subscribers reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            page: 1,
            loading: false,
            allSubscribersLoaded: false,
            subscribers: [],
            followersCount: 0,
            followingCount: 0,
        };
        expect(subscribersReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('SET_SUBSCRIBERS_PENDING', () => {
        const action: any = {
            type: types.SET_SUBSCRIBERS_PENDING,
        };
        expect(subscribersReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: true,
        });
    });

    it('SET_SUBSCRIBERS_COUNT', () => {
        const action: any = {
            type: types.SET_SUBSCRIBERS_COUNT,
            payload: {followersCount: 1, followingCount: 1},
        };
        expect(subscribersReducer(defaultState, action)).toEqual({
            ...defaultState,
            followersCount: action.payload.followersCount,
            followingCount: action.payload.followingCount,
        });
    });
    it('ALL_SUBSCRIBERS_LOADED', () => {
        const action: any = {
            type: types.ALL_SUBSCRIBERS_LOADED,
        };
        expect(subscribersReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: false,
            allSubscribersLoaded: true,
        });
    });

    it('RESET_SUBSCRIBERS', () => {
        const action: any = {
            type: types.RESET_SUBSCRIBERS,
        };
        expect(subscribersReducer(defaultState, action)).toEqual({
            page: 1,
            loading: true,
            allSubscribersLoaded: false,
            subscribers: [],
            followersCount: 0,
            followingCount: 0,
        });
    });

});
