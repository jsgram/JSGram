import { cropperReducer, defaultState } from '../reducers';
import * as types from '../actionTypes';

describe('Cropper reducer test', () => {
    it('Should return the default state', () => {
        const action: any = {
            avatar: '',
            croppedImage: '',
            file: null,
            error: null,
            loaded: false,
            loading: false,
        };
        expect(cropperReducer(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    it('SET_CROPPED_IMAGE_FOR_AVATAR', () => {
        const action: any = {
            type: types.SET_CROPPED_IMAGE_FOR_AVATAR,
        };
        expect(cropperReducer(defaultState, action)).toEqual({
            ...defaultState,
            croppedImage: action.croppedImage,
        });
    });

    it('SET_AVATAR_TO_CROPPER', () => {
        const action: any = {
            type: types.SET_AVATAR_TO_CROPPER,
        };
        expect(cropperReducer(defaultState, action)).toEqual({
            ...defaultState,
            avatar: action.avatar,
        });
    });
});
