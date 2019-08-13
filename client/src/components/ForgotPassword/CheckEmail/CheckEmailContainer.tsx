import React, { ReactNode } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { checkEmail } from '../../../store/checkEmail/actions';
import validate from '../../../utils/validation';
import './../../styles/style.scss';
import CheckEmail from './CheckEmail';
import { FormProps } from 'reactstrap';

class CheckEmailContainer extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(email: string): any {
        return this.props.checkEmail(email);
    }

    public render(): ReactNode {
        const {handleSubmit, submitting}: FormProps = this.props;
        return (
            <CheckEmail
                handleSubmit={handleSubmit}
                onSubmit={this.onSubmit}
                submitting={submitting}
            />
        );
    }
}

export default connect(
    null,
    {checkEmail},
)(
    reduxForm({
        form: 'checkEmailForm',
        validate,
    })(CheckEmailContainer),
);
