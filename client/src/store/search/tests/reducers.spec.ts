import { searchReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';

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
            loading: false,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            searchResults: action.payload,
            loading: action.loading,
        });
    });

    it('GET_SEARCH_RESULTS_PENDING', () => {
        const action: any = {
            type: types.GET_SEARCH_RESULTS_PENDING,
            loading: true,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: action.loading,
        });
    });

    it('CLEAR_SEARCH_RESULTS', () => {
        const action: any = {
            type: types.CLEAR_SEARCH_RESULTS,
            searchResults: [],
            page: 1,
            loaded: false,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            searchResults: action.searchResults,
            page: action.page,
            loaded: action.loaded,
        });
    });

    it('GET_MORE_RESULTS_SUCCESS', () => {
        const action: any = {
            type: types.GET_MORE_RESULTS_SUCCESS,
            payload: [],
            loading: false,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            searchResults: [...defaultState.searchResults, ...action.payload],
            loading: action.loading,
        });
    });

    it('ALL_RESULTS_LOADED', () => {
        const action: any = {
            type: types.ALL_RESULTS_LOADED,
            loaded: true,
            page: 1,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
            page: action.page,
        });
    });

    it('CLEAR_LOADED', () => {
        const action: any = {
            type: types.CLEAR_LOADED,
            loaded: false,
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            loaded: action.loaded,
        });
    });

    it('ADD_NEXT_RESULTS', () => {
        const action: any = {
            type: types.ADD_NEXT_RESULTS,
            payload: [],
        };
        expect(searchReducer(defaultState, action)).toEqual({
            ...defaultState,
            page: action.payload,
        });
    });
});
