import API from "../api";
import {setToken} from "./setToken.helper";

export const loginUser = (user: object) => (dispatch: Function) => {
  return API.post("/auth/login", user)
    .then(response => {
        setToken(response.data.token);
    })
    .catch(err => console.log(err.message));
};
