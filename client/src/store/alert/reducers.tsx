interface Action {
  type: string;
  message: string;
  color: string;
}

const initialState = { message: "" };

export const alertReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return { ...state, message: action.message, color: action.color };
    case "CLEAR_ALERT":
      return { ...initialState };
    default:
      return state;
  }
};
