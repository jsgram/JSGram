import { SET_CROPPED_IMAGE_FOR_POST, RESET_ADD_POST, SET_DESCRIPTION_FOR_POST } from './actionTypes';

export interface IState {
    croppedImage: string;
    description: string;
}

export const defaultState = {
    croppedImage: '',
    description: '',
};

export const addPostReducers = (state: IState = defaultState, action: any): any => {
    switch (action.type) {
    case SET_CROPPED_IMAGE_FOR_POST:
        return {
            ...state,
            croppedImage: action.payload,
        };

    case SET_DESCRIPTION_FOR_POST:
        return {
            ...state,
            description: action.payload,
        };

    case RESET_ADD_POST:
        return {
            croppedImage: '',
            description: '',
        }

    default:
        return state;
    }
};
