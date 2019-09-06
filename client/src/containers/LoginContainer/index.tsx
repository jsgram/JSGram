import React from 'react';
import { Login } from '../../components/Login';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../store/login/actions';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';

export const LoginContainer = (props: any): JSX.Element => {
    const onSubmit = (user: IUser): void => {
        return props.loginUser(user);
    };

    const {handleSubmit, submitting}: FormProps = props;
    return (
        <Login
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            submitting={submitting}
        />
    );
};

export default connect(
    null,
    {loginUser},
)(
    reduxForm({
        form: 'loginForm',
        validate,
    })(LoginContainer),
);
