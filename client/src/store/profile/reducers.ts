import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    END_LOADING,
} from './actionTypes';
import {IUserData} from '../../components/Profile/Profile';

interface IState {
    user: IUserData;
    loading: boolean;
    error: any;
    timer: any;
}

const defaultState = {
    user: {
        first_name: '',
        last_name: '',
        avatar: '',
    },
    loading: false,
    error: '',
    timer: null,
};

export const profileReducer = (
        state: IState = defaultState,
        action: { type: string, payload: any, timer: any }): IState => {
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
            timer: action.timer,
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
