import API from "../api";
import {setToken} from "./setToken.helper";

const TOKEN_WORD_LENGTH = 6;

export const loginUser = (user: object) => (dispatch: Function) => {
  return API.post("/auth/login", user)
    .then(response => {
        setToken(response.data.token);
    })
    .catch(err => console.log(err.message));
};

export const cookieToLocalStorage = () => (dispatch: Function): void => {
    const cookie = document.cookie.slice(TOKEN_WORD_LENGTH);
    setToken(cookie);
};
