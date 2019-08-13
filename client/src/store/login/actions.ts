import API from "../api";
import { showAlert } from "../../store/alert/actions";
const TOKEN = "TOKEN";

export const loginUser = (user: object) => (dispatch: Function) => {
  return API.post("/auth/login", user)
    .then(response => {
      localStorage.setItem(TOKEN, response.data.token);
    })
    .catch(err => console.log(err.message));
};
