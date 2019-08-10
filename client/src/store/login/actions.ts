import API from "../api";
const TOKEN = "TOKEN";

export const loginUser = (user: object) => (dispatch: Function) => {
  return API.post("/auth/login", user)
    .then(response => {
      localStorage.setItem(TOKEN, response.data.token);
    })
    .catch(err => console.log(err));
};
