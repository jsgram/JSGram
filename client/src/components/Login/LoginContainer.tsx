import React from 'react';
import {connect} from 'react-redux';
import Login from "./Login";
import {setEmailText, setPasswordText} from "../../store/login/actions";

interface FormProps {
    email: string;
    password: string;
    setEmailText: Function;
    setPasswordText: Function;
}

interface LoginState {
    email: string;
    password: string;
}

interface FormState {
    login: LoginState;
}

class LoginContainer extends React.Component<FormProps, FormState> {
    render() {
        return <Login email={this.props.email} password={this.props.password} setEmailText={this.props.setEmailText}
                      setPasswordText={this.props.setPasswordText}/>;
    }
}

const mapStateToProps = (state: FormState) => {
    return {
        email: state.login.email,
        password: state.login.password
    };
};

const mapDispatchToProps = {
    setEmailText,
    setPasswordText
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);