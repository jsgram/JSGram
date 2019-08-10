import React from "react";
import Register from "./Register";
import { reduxForm } from "redux-form";
import API from "../../store/api";
import { showAlert } from "../../store/alert/actions";

class RegisterContainer extends React.Component<any> {
  onSubmit = (user: any, dispatch: Function) => {
    return API.post("/user", user)
      .then(response => {
        dispatch(showAlert(response.data.status, "success"));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Register
        handleSubmit={handleSubmit}
        onSubmit={this.onSubmit}
        submitting={submitting}
      />
    );
  }
}

export default reduxForm({ form: "registerForm" })(RegisterContainer);
