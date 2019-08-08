import {
  LOGIN_CHANGE_EMAIL_TEXT,
  LOGIN_CHANGE_PASSWORD_TEXT
} from './actionTypes';

const defaultState = {
  email: '',
  password: ''
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
    default:
      return state;
  }
};
