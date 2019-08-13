import React from "react";
import Login from "./Login";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../store/login/actions";
import validate from '../../utils/validation'

class LoginContainer extends React.Component<any> {
  onSubmit = (user: { email: string, password: string }) => {
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
