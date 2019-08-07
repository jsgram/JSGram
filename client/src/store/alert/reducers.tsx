interface Action {
  type: string;
  payload: string;
}

const initialState = { message: "" };

export const alertReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return { ...state, message: action.payload };
    case "CLEAR_ALERT":
      return { ...initialState };
    default:
      return state;
  }
};
