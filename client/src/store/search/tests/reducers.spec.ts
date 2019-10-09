import {searchReducer, defaultState} from '../reducers';
import * as types from '../actionTypes';
import {
    GET_SEARCH_RESULTS_SUCCESS,
    GET_SEARCH_RESULTS_PENDING,
    CLEAR_SEARCH_RESULTS,
    CLEAR_LOADED,
    ADD_NEXT_RESULTS,
    GET_MORE_RESULTS_SUCCESS,
    ALL_RESULTS_LOADED,
} from '../actionTypes';

describe('Search reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            searchResults: [],
            loaded: false,
            loading: false,
            page: 1,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('GET_SEARCH_RESULTS_SUCCESS', () => {
        const action: any = {
            type: types.GET_SEARCH_RESULTS_SUCCESS,
            payload: [],
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            searchResults: [...action.payload],
            loading: false,
        });
    });

    it('GET_SEARCH_RESULTS_PENDING', () => {
        const action: any = {
            type: types.GET_SEARCH_RESULTS_PENDING,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: true,
        });
    });

    it('CLEAR_SEARCH_RESULTS', () => {
        const action: any = {
            type: types.CLEAR_SEARCH_RESULTS,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            searchResults: [],
            page: 1,
            loaded: false,
        });
    });

    it('GET_MORE_RESULTS_SUCCESS', () => {
        const action: any = {
            type: types.GET_MORE_RESULTS_SUCCESS,
            payload: [],
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            searchResults: [...action.payload],
            loading: false,
        });
    });

    it('ALL_RESULTS_LOADED', () => {
        const action: any = {
            type: types.ALL_RESULTS_LOADED,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: true,
            page: 1,
        });
    });

    it('CLEAR_LOADED', () => {
        const action: any = {
            type: types.CLEAR_LOADED,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: false,
        });
    });

    it('ADD_NEXT_RESULTS', () => {
        const action: any = {
            type: types.ADD_NEXT_RESULTS,
            payload: 1,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            page: action.payload,
        });
    });

});
