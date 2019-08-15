import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from './actionTypes';
import {IUserData} from '../../components/Profile/Profile';

interface IState {
    user: IUserData;
    error: any;
    loaded: boolean;
}

const defaultState = {
    user: {
        first_name: '',
        last_name: '',
        avatar: '',
    },
    error: '',
    loading: true,
    loaded: false,
};

export const profileReducer = (
        state: IState = defaultState,
        action: { type: string, payload: any, loaded: boolean }): IState => {
    switch (action.type) {
    case GET_USER_PENDING:
        return {
            ...state,
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
        };
    default:
        return state;
    }
};
