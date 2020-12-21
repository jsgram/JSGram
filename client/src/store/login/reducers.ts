import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from './actionTypes';

interface IState {
    user: {
        posts: number;
        followers: number;
        following: number;
        description: string;
        fullName: string;
        username: string;
        photo: string;
        email: string;
        _id: string;
    };
    error: any;
    loaded: boolean;
    loading: boolean;
}

export const defaultState = {
    user: {
        posts: 0,
        followers: 0,
        following: 0,
        description: '',
        fullName: '',
        username: '',
        photo: '',
        email: '',
        _id: '',
    },
    error: '',
    loaded: false,
    loading: false,
};

export const loginReducer = (
    state: IState = defaultState,
    action: { type: string, payload: any }): IState => {
    switch (action.type) {
        case GET_USER_PENDING:
            return {
                ...state,
                loaded: false,
                error: '',
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loaded: true,
            };
        case GET_USER_ERROR:
            return {
                ...state,
                error: action.payload,
                loaded: false,
            };
        default:
            return state;
    }
};
