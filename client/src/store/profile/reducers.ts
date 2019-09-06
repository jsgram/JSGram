import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    DELETE_PHOTO_PENDING,
    DELETE_PHOTO_SUCCESS,
    DELETE_PHOTO_ERROR,
    SET_PHOTO_TO_STATE,
    CHANGE_SETTINGS_PENDING,
    CHANGE_SETTINGS_SUCCESS,
    CHANGE_SETTINGS_ERROR,
    DECREMENT_POST_COUNT,
    UPLOAD_AVATAR_PENDING,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_ERROR,
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
    avatar: File | null;
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
        subscriptions: {},
        privacy: {},
        email: '',
        _id: '',
    },
    error: '',
    loaded: false,
    loading: false,
    avatar: null,
};

export const profileReducer = (
        state: IState = defaultState,
        action: { type: string, payload: any },
): IState => {
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
        case DELETE_PHOTO_PENDING:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PHOTO_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    photo: action.payload,
                },
                loading: false,
            };
        case DELETE_PHOTO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case SET_PHOTO_TO_STATE:
            return {
                ...state,
                user: {
                    ...state.user,
                    photo: action.payload,
                },
            };
        case CHANGE_SETTINGS_PENDING:
            return {
                ...state,
                error: '',
                loaded: false,
                loading: true,
            };
        case CHANGE_SETTINGS_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
                loaded: true,
                loading: false,
            };
        case CHANGE_SETTINGS_ERROR:
            return {
                ...state,
                error: action.payload,
                loaded: false,
                loading: false,
            };
        case DECREMENT_POST_COUNT:
            return {
                ...state,
                user: {
                    ...state.user,
                    posts: state.user.posts - 1,
                },
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
