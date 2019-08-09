import {
    CHECK_EMAIL_SET_EMAIL,
    CHECK_EMAIL_PENDING,
    CHECK_EMAIL_SUCCESS,
    CHECK_EMAIL_ERROR
} from "./actionTypes";

const initialState = {
    email: '',
    loading: false,
    error: ''
};

interface Action {
    type: string;
    payload: string;
}

export const checkEmailReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case CHECK_EMAIL_SET_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case CHECK_EMAIL_PENDING:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case CHECK_EMAIL_SUCCESS:
            return {
                ...initialState
            };
        case CHECK_EMAIL_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
