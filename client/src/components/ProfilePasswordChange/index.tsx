import { changeProfilePassword } from '../../store/changePassword/actions';
import { validatePasswordChange as validate } from '../../utils/validation';
import { renderField } from '../CommonComponents/ReduxFormFields';

import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Label, Button, FormProps } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

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
            <React.Fragment>
                <h3>Change Password</h3>
                <Form className='container mt-4 bg-white text-center p-4' onSubmit={handleSubmit(this.onSubmit)}>
                    <Row className='align-items-center mt-3'>
                        <Label className='col-lg-2 text-left text-right-lg font-weight-bold p-0 mb-0' for='oldPassword'>
                            Old Password
                        </Label>
                        <Field
                            className='col-lg-10 form-control-lg'
                            type='password'
                            name='oldPassword'
                            component={renderField}
                        />
                    </Row>
                    <Row className='align-items-center mt-3'>
                        <Label className='col-lg-2 text-left text-right-lg font-weight-bold p-0 mb-0' for='newPassword'>
                            New Password
                        </Label>
                        <Field
                            className='col-lg-10 form-control-lg'
                            type='password'
                            name='newPassword'
                            component={renderField}
                        />
                    </Row>
                    <Row className='align-items-center mt-3'>
                        <Label
                            className='col-lg-2 text-left text-right-lg font-weight-bold p-0 mb-0'
                            for='newPasswordConfirm'
                        >
                            Confirm New Password
                        </Label>
                        <Field
                            className='col-lg-10 form-control-lg'
                            type='password'
                            name='newPasswordConfirm'
                            component={renderField}
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
            </React.Fragment>
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
