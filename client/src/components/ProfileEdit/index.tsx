import React, {ReactElement} from 'react';
import {Field} from 'redux-form';
import {Button, Form, FormProps, FormGroup, Label, Col, Spinner} from 'reactstrap';
import {IUser} from '../../store/commonInterfaces/commonInterfaces';
import {renderField} from '../CommonComponents/ReduxFormFields';

interface IProps {
    initialValues: {
        photo: string;
    };
    deletePhoto: () => void;
    handleSubmit: () => void;
    onChangeProfile: (user: IUser) => IUser;
    submitting: boolean;
}

const ProfileEdit = (props: IProps): ReactElement => {

    const {handleSubmit, onChangeProfile, submitting}: FormProps = props;
    const {photo}: { photo: string } = props.initialValues;
    return (
        <div>

            <Form className='d-flex flex-column mt-4 bg-white border p-4' onSubmit={handleSubmit(onChangeProfile)}>
                <FormGroup row>
                    <Label className='col-sm-3'>Name</Label>
                    <Col className='col-sm-9'>
                        <Field name='fullName'
                               type='text'
                               component={renderField}
                               label='fullname'
                               placeholder='Fullname'
                               className='form-control'/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label className='col-sm-3'>Username</Label>
                    <Col className='col-sm-9'>
                        <Field name='username'
                               type='text'
                               component={renderField}
                               label='username'
                               placeholder='Username'
                               className='form-control'/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label className='col-sm-3'>Bio</Label>
                    <Col className='col-sm-9'>
                        <Field name='description'
                            type='textarea'
                            component={renderField}
                            label='description'
                            placeholder='Description'
                            className='form-control'/>
                    </Col>
                </FormGroup>

                <Button
                    className='align-self-center btn mt-3'
                    color='danger'
                    disabled={submitting}>
                        <i className='fa fa-save pr-3'/>
                        Save profile
                    </Button>
                    {submitting && <Spinner className='mt-3' color='dark'/>}
            </Form>
        </div>

    );
};

export default ProfileEdit;
