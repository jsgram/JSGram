import React from 'react';
import {connect} from 'react-redux';
import Login from "./Login";
import {setEmailText, setPasswordText, getApiData} from "../../store/login/actions";

interface FormProps {
    email: string;
    password: string;
    token: any;
    setEmailText: Function;
    setPasswordText: Function;
    getApiData: Function;
}

interface LoginState {
    email: string;
    password: string;
    token: any;
}


interface FormState {
    login: LoginState;
}

class LoginContainer extends React.Component<FormProps, FormState> {
    render() {
        return <Login email={this.props.email}
                      password={this.props.password}
                      setEmailText={this.props.setEmailText}
                      setPasswordText={this.props.setPasswordText}
                      getApiData={this.props.getApiData}
        />;
    }
}

const mapStateToProps = (state: FormState) => {
    return {
        email: state.login.email,
        password: state.login.password,
        token: state.login.token
    };
};

const mapDispatchToProps = {
    setEmailText,
    setPasswordText,
    getApiData
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);