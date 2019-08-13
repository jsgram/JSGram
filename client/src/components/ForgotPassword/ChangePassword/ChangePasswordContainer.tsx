import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import ChangePassword from './ChangePassword';
import { changePassword } from '../../../store/changePassword/actions';
import { reduxForm } from 'redux-form';
import validate from '../../../utils/validation';
import { FormProps } from 'reactstrap';

class ChangePasswordContainer extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(password: string): any {
        return this.props.changePassword(password, window.location.pathname.slice(17));
    }

    public render(): ReactNode {
        const {handleSubmit, submitting}: FormProps = this.props;
        return (
            <ChangePassword
                handleSubmit={handleSubmit}
                onSubmit={this.onSubmit}
                submittting={submitting}
            />
        );
    }
}

export default connect(
    null,
    {changePassword},
)(
    reduxForm({
        form: 'changePassword',
        validate,
    })(ChangePasswordContainer),
);
