const initialState = {
  username: "",
  fullname: "",
  email: "",
  password: ""
};

interface Action {
  type: string;
  payload: string;
}

export const registerReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "REGISTER_USERNAME":
      return {
        ...state,
        username: action.payload
      };
    case "REGISTER_FULLNAME":
      return {
        ...state,
        fullname: action.payload
      };
    case "REGISTER_EMAIL":
      return {
        ...state,
        email: action.payload
      };
    case "REGISTER_PASSWORD":
      return {
        ...state,
        password: action.payload
      };
    case "REGISTER_USER":
      return {
        ...state
      };
    default:
      return state;
  }
};
