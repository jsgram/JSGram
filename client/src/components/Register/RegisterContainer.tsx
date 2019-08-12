import React from "react";
import Register from "./Register";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../store/register/actions";

const validate = (user: any) => {
  const errors: any = {};
  if (!user.username || user.username.length < 3) {
    errors.username = "Please, enter your username!";
  }
  if (!user.email) {
    errors.email = "Please, enter your email!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
    errors.email = "Invalid email address";
  }
  if (!user.fullName || user.fullName.length < 3) {
    errors.fullName = "Please, enter your fullname!";
  }
  if (!user.password || user.password.length < 8) {
    errors.password = "Please, enter your password!"
  }
  return errors;
};

class RegisterContainer extends React.Component<any> {
  onSubmit = (user: any) => {
    return this.props.registerUser(user);
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

export default connect(
  null,
  { registerUser }
)(
  reduxForm({
    form: "registerForm",
    validate
  })(RegisterContainer)
);
