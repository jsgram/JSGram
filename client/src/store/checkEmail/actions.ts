import { showAlert } from "../../store/alert/actions";
import API from "../api";

export const checkEmail = (email: object) => (dispatch: Function) => {
  return API.post("/forgot-password", email)
    .then(response => {
      dispatch(showAlert(response.data.status, "success"));
    })
    .catch(err => console.log(err));
};
