import { SET_CROPPED_IMAGE_POST } from './actionTypes';

export interface IState {
    croppedImage: string;
}

export const defaultState = {
    croppedImage: '',
};

export const addPostReducers = (state: IState = defaultState, action: any): any => {
    switch (action.type) {
    case SET_CROPPED_IMAGE_POST:
        return{
            ...state,
            croppedImage: action.payload,
        };

    default:
        return state;
    }
};
