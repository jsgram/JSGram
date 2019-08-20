import {
    SET_AVATAR_TO_CROPPER,
    UPLOAD_AVATAR_PENDING,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_ERROR,
} from './actionTypes';

export interface IState {
    avatar: File | null;
    error: Error | null;
    loaded: boolean;
    loading: boolean;
}

export const defaultState = {
    avatar: null,
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

    case UPLOAD_AVATAR_PENDING:
        return {
            ...state,
            loaded: false,
            error: null,
            loading: true,
        };
    case UPLOAD_AVATAR_SUCCESS:
        return {
            ...state,
            avatar: action.payload,
            loaded: true,
            loading: false,
        };
    case UPLOAD_AVATAR_ERROR:
        return {
            ...state,
            error: action.payload,
            loaded: false,
            loading: false,
        };
    default:
        return state;
    }
};
