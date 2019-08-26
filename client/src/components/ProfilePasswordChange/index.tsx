import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Button, Spinner, FormProps, FormGroup, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { changeProfilePassword } from '../../store/changePassword/actions';
import { validatePasswordChange as validate } from '../../utils/validation';
import { renderField } from '../CommonComponents/ReduxFormFields';

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
                <h3 className='text-center font-weight-light text-secondary text-uppercase'>Change Password</h3>
                <Form className='d-flex flex-column mt-3 bg-white p-4' onSubmit={handleSubmit(this.onSubmit)}>
                    <FormGroup row>
                        <Label className='col-sm-3' for='oldPassword'>
                            Old Password
                        </Label>
                        <Col className='col-sm-9'>
                            <Field
                                className='form-control'
                                type='password'
                                name='oldPassword'
                                component={renderField}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className='col-sm-3' for='newPassword'>
                            New Password
                        </Label>
                        <Col className='col-sm-9'>
                            <Field
                                className='form-control'
                                type='password'
                                name='newPassword'
                                component={renderField}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className='col-sm-3' for='newPasswordConfirm'>
                            Confirm New Password
                        </Label>
                        <Col className='col-sm-9'>
                        <Field
                            className='form-control'
                            type='password'
                            name='newPasswordConfirm'
                            component={renderField}
                        />
                        </Col>
                    </FormGroup>
                    <Button
                        className='align-self-center btn mt-3'
                        color='danger'
                        disabled={submitting}
                    >
                        <i className='fa fa-edit pr-3' />
                        {submitting ? <Spinner color='light' /> : 'Change Password'}
                    </Button>
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
