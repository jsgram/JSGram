import { showAlert } from "../../store/alert/actions";
import API from "../api";
import { reset } from 'redux-form'

export const registerUser = (user: object) => (dispatch: Function) => {
  return API.post("/user", user)
    .then(response => {
      dispatch(showAlert(response.data.status, "success"));
      dispatch(reset('registerForm'));
    })
    .catch(err => console.log(err));
};
