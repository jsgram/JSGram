import { changeProfilePassword } from '../../store/changePassword/actions';
import { validatePasswordChange as validate } from '../../utils/validation';
import { passwordFieldProfile } from '../CommonComponents/ReduxFormFields';

import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Label, Button, Spinner, FormProps } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

interface IStateToProps {
    changeProfilePassword: any; // FIXME
}

class ProfilePasswordChange extends React.Component<any> { // FIXME
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(data: any): any { // FIXME
        this.props.changeProfilePassword(data.oldPassword, data.newPassword);
    }

    public render(): JSX.Element {
        const { handleSubmit, submitting }: FormProps = this.props;
        return (
            <Form className='container mt-4 bg-white text-center p-4' onSubmit={handleSubmit(this.onSubmit)}>
                <h3 className='font-weight-bold text-left mb-4'>Change Password:</h3>
                <Row className='align-items-center mt-3'>
                    <Label className='col-lg-2 text-left text-lg-right font-weight-bold p-0 pr-3 mb-0'
                        for='oldPassword'
                    >
                        Old Password
                    </Label>
                    <Field
                        className='col-lg-10'
                        type='password'
                        name='oldPassword'
                        component={passwordFieldProfile}
                    />
                </Row>
                <Row className='align-items-center mt-3'>
                    <Label className='col-lg-2 text-left text-lg-right font-weight-bold p-0 pr-3 mb-0'
                        for='newPassword'
                    >
                        New Password
                    </Label>
                    <Field
                        className='col-lg-10'
                        type='password'
                        name='newPassword'
                        component={passwordFieldProfile}
                    />
                </Row>
                <Row className='align-items-center mt-3'>
                    <Label
                        className='col-lg-2 text-left text-lg-right font-weight-bold p-0 pr-3 mb-0'
                        for='newPasswordConfirm'
                    >
                        Confirm New Password
                    </Label>
                    <Field
                        className='col-lg-10'
                        type='password'
                        name='newPasswordConfirm'
                        component={passwordFieldProfile}
                    />
                </Row>
                <Row className='mt-4'>
                    <Button
                        className='btn offset-lg-2 mt-3'
                        color='danger'
                        disabled={submitting}
                    >
                        Change Password
                    </Button>
                </Row>
                <Row className='mt-4'>
                    <Link className='offset-lg-2 text-danger pl-1' to='/password-reset'>
                        Forgot Password?
                    </Link>
                </Row>
            </Form>
        );
    }
}

const mapDispatchToProps = {
    changeProfilePassword,
};

const elementWrapper = reduxForm({
    form: 'changeProfilePassword',
    validate,
})(ProfilePasswordChange);

export default connect(null, mapDispatchToProps)(elementWrapper);
