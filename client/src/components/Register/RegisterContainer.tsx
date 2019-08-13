import React, { ReactNode } from 'react';
import Register from './Register';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../../store/register/actions';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';

interface IUser extends InjectedFormProps {
    username: string;
    email: string;
    fullName: string;
    password: string;
}

class RegisterContainer extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(user: IUser): IUser {
        return this.props.registerUser(user);
    }

    public render(): ReactNode {
        const {handleSubmit, submitting}: FormProps = this.props;
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
    {registerUser},
)(
    reduxForm({
        form: 'registerForm',
        validate,
    })(RegisterContainer),
);
