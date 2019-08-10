import React from "react";
import CheckEmail from "./CheckEmail";
import { reduxForm } from "redux-form";
import API from "../../../store/api";
import { showAlert } from "../../../store/alert/actions";

class CheckEmailContainer extends React.Component<any> {
  onSubmit = (email: any, dispatch: Function) => {
    return API.post("/forgot-password", email)
      .then(response => {
        dispatch(showAlert(response.data.status, "success"));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <CheckEmail
        handleSubmit={handleSubmit}
        onSubmit={this.onSubmit}
        submitting={submitting}
      />
    );
  }
}

export default reduxForm({ form: "checkEmailForm" })(CheckEmailContainer);
