import {
    SET_AVATAR_TO_CROPPER,
    SET_CROPPED_IMAGE_FOR_AVATAR,
} from './actionTypes';

export interface IState {
    avatar: string;
    croppedImage: string;
    file: File | null;
    error: Error | null;
    loaded: boolean;
    loading: boolean;
}

export const defaultState = {
    avatar: '',
    croppedImage: '',
    file: null,
    error: null,
    loaded: false,
    loading: false,
};

export const cropperReducer = (state: IState = defaultState, action: { type: string, payload: string }): IState => {
    switch (action.type) {

        case SET_CROPPED_IMAGE_FOR_AVATAR:
            return {
                ...state,
                croppedImage: action.payload,
            };
        case SET_AVATAR_TO_CROPPER:
            return {
                ...state,
                avatar: action.payload,
            };
        default:
            return state;
    }
};
