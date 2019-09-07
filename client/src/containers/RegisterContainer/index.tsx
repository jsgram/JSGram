import React from 'react';
import { Register } from '../../components/Register';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as action from '../../store/register/actions';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';

const RegisterContainer = ({registerUser, handleSubmit, submitting}: FormProps): JSX.Element => {
    const onSubmit = (user: IUser): void => {
        registerUser(user);
    };

    return (
        <Register
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            submitting={submitting}
        />
    );
};

export default connect(
    null,
    {registerUser: action.registerUser},
)(
    reduxForm({
        form: 'registerForm',
        validate,
    })(RegisterContainer),
);
