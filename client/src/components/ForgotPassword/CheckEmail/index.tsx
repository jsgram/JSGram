import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as action from '../../../store/checkEmail/actions';
import validate from '../../../utils/validation';
import '../../../styles/style.scss';
import { Button, Form, FormGroup, FormProps, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { renderField } from '../../CommonComponents/ReduxFormFields';

export const CheckEmail = ({checkEmail, handleSubmit, submitting}: FormProps): JSX.Element => {
    const onSubmit = (email: string): void => {
        return checkEmail(email);
    };

    return (
        <div className='container-fluid header'>
            <div className='row justify-content-center align-items-center'>
                <div className='col-sm-8 col-md-6 col-xl-5'>
                    <Form className='mt-4 bg-white' onSubmit={handleSubmit(onSubmit)}>
                        <div className='border'>
                            <FormGroup className='col-lg-10 offset-lg-1 text-center'>
                                <Link to='/'>
                                    <img className='picture img-fluid' src={logo} alt='logo'/>
                                </Link>
                                <Field
                                    name='email'
                                    type='text'
                                    component={renderField}
                                    label='email'
                                    className='form-control form-control-lg mt-3'
                                    placeholder='E-mail'
                                />
                                <Button
                                    className='mt-3'
                                    disabled={submitting}
                                    color='danger'
                                    size='lg'
                                    block
                                >
                                    {submitting ? <Spinner color='light'/> : 'Send'}
                                </Button>
                            </FormGroup>
                            <div className='or-devider'>
                                <span/>
                                OR
                                <span/>
                            </div>
                            <FormGroup className='text-center logo-google'>
                                <p className='pt-2'>
                                    Still don't have an account?
                                    <Link to='/register' className='text-danger pl-1'>
                                        Register
                                    </Link>
                                </p>
                            </FormGroup>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default connect(
    null,
    {checkEmail: action.checkEmail},
)(
    reduxForm({
        form: 'checkEmailForm',
        validate,
    })(CheckEmail),
);
