import React from "react";
import Register from "./Register";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../store/register/actions";
import validate from '../../utils/validation'

interface User {
  username: string;
  email: string;
  fullName: string;
  password: string;
}

class RegisterContainer extends React.Component<any> {
  onSubmit = (user: User) => {
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
