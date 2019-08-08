import React from "react";
import { connect } from "react-redux";
import Register from "./Register";
import {
  setUsername,
  setFullname,
  setEmail,
  setPassword,
  registerUser
} from "../../store/register/actions";

interface FormProps {
  username: string;
  fullname: string;
  email: string;
  password: string;
  setUsername: Function;
  setFullname: Function;
  setEmail: Function;
  setPassword: Function;
  registerUser: Function;
}

interface RegisterState {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

interface FormState {
  register: RegisterState;
}

class RegisterContainer extends React.Component<FormProps, FormState> {
  render() {
    return (
      <Register
        username={this.props.username}
        fullname={this.props.fullname}
        email={this.props.email}
        password={this.props.password}
        setUsername={this.props.setUsername}
        setFullname={this.props.setFullname}
        setEmail={this.props.setEmail}
        setPassword={this.props.setPassword}
        registerUser={this.props.registerUser}
      />
    );
  }
}

const mapStateToProps = (state: FormState) => {
  return {
    username: state.register.username,
    fullname: state.register.fullname,
    email: state.register.email,
    password: state.register.password
  };
};

const mapDispatchToProps = {
  setUsername,
  setFullname,
  setEmail,
  setPassword,
  registerUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer);
