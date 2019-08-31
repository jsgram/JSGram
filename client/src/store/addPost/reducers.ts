import {
    SET_CROPPED_IMAGE_FOR_POST,
    RESET_ADD_POST,
    SET_DESCRIPTION_FOR_POST,
    GET_POST_PENDING,
    GET_POST_SUCCESS, GET_POST_ERROR,
} from './actionTypes';

export interface IState {
    croppedImage: string;
    description: string;
    loading: boolean;
}

export const defaultState = {
    croppedImage: '',
    description: '',
    loading: false,
};

export const addPostReducer = (state: IState = defaultState, action: any): any => {
    switch (action.type) {
    case GET_POST_PENDING:
        return {
            ...state,
            loading: true,
            error: '',
        };
    case GET_POST_SUCCESS:
        return {
            ...state,
            post: action.payload,
            loading: false,
        };
    case GET_POST_ERROR:
        return {
            ...state,
            error: action.payload,
            loading: false,
        };
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
        };

    default:
        return state;
    }
};
