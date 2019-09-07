import {
    SET_AVATAR_TO_CROPPER,
} from './actionTypes';

export interface IState {
    avatar: File | null;
    file: File | null;
    error: Error | null;
    loaded: boolean;
    loading: boolean;
}

export const defaultState = {
    avatar: null,
    file: null,
    error: null,
    loaded: false,
    loading: false,
};

export const cropperReducer = (state: IState = defaultState, action: { type: string, payload: any }): IState => {
    switch (action.type) {
        case SET_AVATAR_TO_CROPPER:
            return {
                ...state,
                avatar: action.payload,
            };
        default:
            return state;
    }
};
