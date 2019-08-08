import {
  REGISTER_SET_USERNAME,
  REGISTER_SET_FULLNAME,
  REGISTER_SET_EMAIL,
  REGISTER_SET_PASSWORD,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from "./actionTypes";

const initialState = {
  username: "",
  fullname: "",
  email: "",
  password: "",
  loading: false,
  error: ""
};

interface Action {
  type: string;
  payload: string;
}

export const registerReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case REGISTER_SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case REGISTER_SET_FULLNAME:
      return {
        ...state,
        fullname: action.payload
      };
    case REGISTER_SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case REGISTER_SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case REGISTER_PENDING:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case REGISTER_SUCCESS:
      return {
        ...initialState
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
