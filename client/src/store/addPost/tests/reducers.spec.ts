import { addPostReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';
import { RESET_ADD_POST } from '../actionTypes';

describe('addPost reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            croppedImage: '',
            description: '',
            loading: false,
        };
        expect(addPostReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('GET_POST_PENDING', () => {
        const action: any = {
            type: types.GET_POST_PENDING,
            loading: true,
            error: '',
        };

        expect(addPostReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: action.loading,
            error: action.error,
        });
    });

    it('GET_POST_SUCCESS', () => {
        const action: any = {
            type: types.GET_POST_SUCCESS,
            loading: false,
        };

        expect(addPostReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: action.loading,
        });
    });

    it('GET_POST_ERROR', () => {
        const action: any = {
            type: types.GET_POST_ERROR,
            loading: false,
        };

        expect(addPostReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: action.loading,
        });
    });

    it('SET_CROPPED_IMAGE_FOR_POST', () => {
        const action: any = {
            type: types.SET_CROPPED_IMAGE_FOR_POST,
        };

        expect(addPostReducer(defaultState, action)).toEqual({
            ...defaultState,
            croppedImage: action.croppedImage,
        });
    });

    it('SET_DESCRIPTION_FOR_POST', () => {
        const action: any = {
            type: types.SET_DESCRIPTION_FOR_POST,
        };

        expect(addPostReducer(defaultState, action)).toEqual({
            ...defaultState,
            description: action.description,
        });
    });

    it('RESET_ADD_POST', () => {
        const action: any = {
            type: types.RESET_ADD_POST,
        };

        expect(addPostReducer(defaultState, action)).toEqual({
            ...defaultState,
            loading: action.loading,
        });
    });
});
