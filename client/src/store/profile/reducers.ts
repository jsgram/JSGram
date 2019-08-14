import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    END_LOADING,
} from './actionTypes';

const defaultState = {
    user: {},
    loading: false,
    error: '',
};

export const profileReducer = (state: any = defaultState, action: {type: string, payload: any}): void => {
    switch (action.type) {
    case GET_USER_PENDING:
        return {
            ...state,
            loading: true,
            error: '',
        };
    case GET_USER_SUCCESS:
        return {
            ...state,
            user: action.payload,
        };
    case END_LOADING:
        return {
            ...state,
            loading: false,
        };
    case GET_USER_ERROR:
        return {
            ...state,
            error: action.payload,
            loading: false,
        };
    default:
        return state;
    }
};
