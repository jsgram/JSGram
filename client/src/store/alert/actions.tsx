export const showAlert = (message: string, color: string) => ({
  type: "SHOW_ALERT",
  message,
  color
});

export const clearAlert = () => ({ type: "CLEAR_ALERT" });
