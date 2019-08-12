import React from "react";
import CheckEmail from "./CheckEmail";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { checkEmail } from "../../../store/checkEmail/actions";

const validate = (user: any) => {
  const errors: any = {};
  if (!user.email) {
    errors.email = "Please, enter your email!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

class CheckEmailContainer extends React.Component<any> {
  onSubmit = (email: any) => {
    return this.props.checkEmail(email);
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

export default connect(
  null,
  { checkEmail }
)(
  reduxForm({
    form: "checkEmailForm",
    validate
  })(CheckEmailContainer)
);
