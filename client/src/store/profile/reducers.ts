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
    default:
        return state;
    }
};
