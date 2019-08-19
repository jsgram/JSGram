import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    DELETE_PHOTO_SUCCESS,
} from './actionTypes';
import {IUserData} from '../../components/Profile/Profile';

interface IState {
    user: IUserData;
    error: any;
    loaded: boolean;
    photo?: string;
}

const defaultState = {
    user: {
        posts: 0,
        followers: 0,
        following: 0,
        description: '',
        fullName: '',
        username: '',
        photo: '',
    },
    error: '',
    loaded: false,
};

export const profileReducer = (
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
    case DELETE_PHOTO_SUCCESS:
        return {
            ...state,
            user: {
                ...state.user,
                photo: action.payload,
            },
        };
    default:
        return state;
    }
};
