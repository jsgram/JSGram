import React from 'react';
import Index from '../../components/Register';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../../store/register/actions';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';

class RegisterContainer extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(user: IUser): IUser {
        return this.props.registerUser(user);
    }

    public render(): JSX.Element {
        const {handleSubmit, submitting}: FormProps = this.props;
        return (
            <Index
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
