import React from "react";
import Login from "./Login";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../store/login/actions";

const validate = (user: any) => {
  const errors: any = {};
  if (!user.email) {
    errors.email = "Required!";
  }
  if (!user.password) {
    errors.password = "Required!";
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
