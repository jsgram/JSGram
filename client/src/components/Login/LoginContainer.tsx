import React from "react";
import Login from "./Login";
import { reduxForm } from "redux-form";
import API from "../../store/api";
import { showAlert } from "../../store/alert/actions";

const TOKEN = "TOKEN";

class LoginContainer extends React.Component<any> {
  onSubmit = (user: any, dispatch: Function) => {
    return API.post("/auth/login", user)
      .then(response => {
        localStorage.setItem(TOKEN, response.data.token);
        dispatch(showAlert(response.data.status, "success"));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Login
        handleSubmit={handleSubmit}
        onSubmit={this.onSubmit}
        submitting={submitting}
      />
    );
  }
}

export default reduxForm({ form: "loginForm" })(LoginContainer);
