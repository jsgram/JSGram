import { showAlert } from "../../store/alert/actions";
import API from "../api";

export const registerUser = (user: object) => (dispatch: Function) => {
  return API.post("/user", user)
    .then(response => {
      dispatch(showAlert(response.data.status, "success"));
    })
    .catch(err => console.log(err.message));
};
