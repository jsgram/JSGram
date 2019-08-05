import React from 'react';
import {connect} from 'react-redux';
import Login from "./Login";
import {setEmailText, setPasswordText} from "../../store/login/actions";

class LoginContainer extends React.Component {
    render() {
        return <Login email={this.props.email} password={this.props.password} setEmailText={this.props.setEmailText}
                      setPasswordText={this.props.setPasswordText}/>;
    }
}

const mapStateToProps = (state) => {
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