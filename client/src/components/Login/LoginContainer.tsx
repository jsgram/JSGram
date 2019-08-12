import React from "react";
import Login from "./Login";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../store/login/actions";

const validate = (user: any) => {
  const errors: any = {};
  if (!user.email) {
    errors.email = "Please, enter your email!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
    errors.email = "Invalid email address";
  }
  if (!user.password || user.password.length < 8) {
    errors.password = "Please, enter your password!";
  }
  return errors;
};

class LoginContainer extends React.Component<any> {
  onSubmit = (user: any) => {
    return this.props.loginUser(user);
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

export default connect(
  null,
  { loginUser }
)(
  reduxForm({
    form: "loginForm",
    validate
  })(LoginContainer)
);
