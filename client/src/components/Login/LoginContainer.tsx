import React, { ReactNode } from 'react';
import Login from './Login';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../store/login/actions';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';

interface IUser extends InjectedFormProps {
    username: string;
    email: string;
    fullName: string;
    password: string;
}

class LoginContainer extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(user: { email: string, password: string }): IUser {
        return this.props.loginUser(user);
    }

    public render(): ReactNode {
        const {handleSubmit, submitting}: FormProps = this.props;
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
    {loginUser},
)(
    reduxForm({
        form: 'loginForm',
        validate,
    })(LoginContainer),
);
