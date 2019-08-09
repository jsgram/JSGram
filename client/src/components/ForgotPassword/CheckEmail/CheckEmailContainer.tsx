import React from "react";
import { connect } from "react-redux";
import CheckEmail from './CheckEmail';
import {
    setEmail,
    checkEmail
} from "../../../store/checkEmail/action";

interface FormProps {
    email: string;
    setEmail: Function;
    checkEmail: Function;
}

interface CheckEmailState {
    email: string;
}

interface FormState {
    checkEmail: CheckEmailState;
}

class CheckEmailContainer extends React.Component<FormProps, FormState> {
    render() {
        return (
            <CheckEmail
                email={this.props.email}
                setEmail={this.props.setEmail}
                checkEmail={this.props.checkEmail}
            />
        );
    }
}

const mapStateToProps = (state: FormState) => {
    return {
        email: state.checkEmail.email,
    };
};

const mapDispatchToProps = {
    setEmail,
    checkEmail
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckEmailContainer);
