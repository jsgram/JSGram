import {
  LOGIN_CHANGE_EMAIL_TEXT,
  LOGIN_CHANGE_PASSWORD_TEXT,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './actionTypes';

const defaultState = {
  email: '',
  password: '',
  loading: false,
  error: ''
};

interface Action {
  type: string;
  payload: any;
}

export const loginReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case LOGIN_CHANGE_EMAIL_TEXT:
      return {
        ...state,
        email: action.payload
      };
    case LOGIN_CHANGE_PASSWORD_TEXT:
      return {
        ...state,
        password: action.payload
      };
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
