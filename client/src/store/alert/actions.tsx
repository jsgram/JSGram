export const showAlert = (message: string) => ({
  type: "SHOW_ALERT",
  payload: message
});

export const clearAlert = () => ({ type: "CLEAR_ALERT" });
