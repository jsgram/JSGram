import React, { ReactElement } from 'react';
import { Field } from 'redux-form';
import { Button, Form, FormProps, FormGroup, Label, Col, Spinner } from 'reactstrap';
import { renderField } from '../CommonComponents/ReduxFormFields';

export const ProfileEdit = ({ handleSubmit, onChangeProfile, submitting }: FormProps): ReactElement => {
    return (
        <div>
            <h3 className='text-center font-weight-light text-secondary text-uppercase'>Edit Information</h3>
            <Form className='d-flex flex-column mt-3 bg-white p-4' onSubmit={handleSubmit(onChangeProfile)}>
                <FormGroup row className='align-items-center'>
                    <Label className='col-sm-3 m-0'>Name</Label>
                    <Col className='col-sm-9'>
                        <Field name='fullName'
                            type='text'
                            component={renderField}
                            label='fullname'
                            placeholder='Fullname'
                            className='form-control' />
                    </Col>
                </FormGroup>
                <FormGroup row className='align-items-center'>
                    <Label className='col-sm-3 m-0'>Username</Label>
                    <Col className='col-sm-9'>
                        <Field name='username'
                            type='text'
                            component={renderField}
                            label='username'
                            placeholder='Username'
                            className='form-control' />
                    </Col>
                </FormGroup>
                <FormGroup row className='align-items-center'>
                    <Label className='col-sm-3 m-0'>Bio</Label>
                    <Col className='col-sm-9'>
                        <Field name='description'
                            type='textarea'
                            component={renderField}
                            label='description'
                            placeholder='Description'
                            className='form-control' />
                    </Col>
                </FormGroup>
                <Button
                    className='align-self-center btn mt-3'
                    color='danger'
                    disabled={submitting}
                >
                    {submitting ?
                    <div>
                        <Spinner size='sm' />
                        <span className='ml-2'>Loading...</span>
                    </div> :
                    <div>
                        <i className='fa fa-save' />
                        <span className='ml-2'>Save profile</span>
                    </div>}
                </Button>
            </Form>
        </div>
    );
};
