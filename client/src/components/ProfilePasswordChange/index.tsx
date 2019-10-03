import * as action from '../../store/changePassword/actions';
import { validatePasswordChange as validate } from '../../utils/validation';
import { renderField } from '../CommonComponents/ReduxFormFields';
import React from 'react';
import { connect } from 'react-redux';
import { FormProps, Form, FormGroup, Col, Label, Button, Spinner } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const ProfilePasswordChange = ({changeProfilePassword, username, handleSubmit, submitting}: FormProps): JSX.Element => {
    const onSubmit = (data: { oldPassword: string, newPassword: string }): void => {
        changeProfilePassword(username, data.oldPassword, data.newPassword);
    };

    return (
        <div>
            <h3 className='text-center font-weight-light text-secondary text-uppercase'>Change Password</h3>
            <Form className='d-flex flex-column mt-3 bg-white p-4' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup row className='align-items-center'>
                    <Label className='col-sm-3 m-0' for='oldPassword'>
                        Old Password
                    </Label>
                    <Col className='col-sm-9 m-0'>
                        <Field
                            name='oldPassword'
                            type='password'
                            component={renderField}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row className='align-items-center'>
                    <Label className='col-sm-3 m-0' for='newPassword'>
                        New Password
                    </Label>
                    <Col className='col-sm-9 m-0'>
                        <Field
                            name='newPassword'
                            type='password'
                            component={renderField}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row className='align-items-center'>
                    <Label className='col-sm-3 m-0' for='confirmPassword'>
                        Confirm Password
                    </Label>
                    <Col className='col-sm-9 m-0'>
                        <Field
                            name='confirmPassword'
                            type='password'
                            component={renderField}
                        />
                    </Col>
                </FormGroup>
                <Button
                    className='align-self-center btn mt-3'
                    color='danger'
                    disabled={submitting}
                >
                    {submitting ?
                        <div>
                            <Spinner size='sm'/>
                            <span className='ml-2'>Loading...</span>
                        </div> :
                        <div>
                            <i className='fa fa-lock'/>
                            <span className='ml-2'>Change Password</span>
                        </div>}
                </Button>
                <Link className='align-self-center d-block text-danger pl-1 mt-3'
                      to={`/profile/${username}/edit/password-reset`}>
                    Forgot Password?
                </Link>
            </Form>
        </div>
    );
};

const mapStateToProps = (state: FormProps): {username: string} => ({
    username: state.profile.user.username,
});

const mapDispatchToProps = {
    changeProfilePassword: action.changeProfilePassword,
};

const elementWrapper = reduxForm({
    form: 'changeProfilePassword',
    validate,
})(ProfilePasswordChange);

export default connect(mapStateToProps, mapDispatchToProps)(elementWrapper);
