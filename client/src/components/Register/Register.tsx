import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, FormProps, Spinner } from 'reactstrap';
import { renderField } from '../commonComponents/reduxFormFields';
import '../styles/style.scss';
import logo from '../assets/logo.png';

class Register extends React.Component<any> {
    public render(): JSX.Element {
        const {handleSubmit, onSubmit, submitting}: FormProps = this.props;
        return (
            <div>
                <Form className='mt-4 bg-white' onSubmit={handleSubmit(onSubmit)}>
                    <div className='border'>
                        <FormGroup className='col-lg-10 offset-lg-1 text-center'>
                            <Link to='/'><img className='picture' src={logo} alt='logo'/></Link>
                            <p>Sign up to see photos from your friends.</p>
                            <p>
                                <i className='fa fa-google-plus'/>
                                <a href={process.env.REACT_APP_GOOGLE_AUTH_URL}
                                   className='text-danger login_google pl-2'>Log in with Google</a>
                            </p>
                            <div className='or-devider'>
                                <span></span>OR<span></span>
                            </div>
                            <Field
                                name='username'
                                type='text'
                                component={renderField}
                                label='username'
                                placeholder='Username'
                                className='form-control form-control-lg mt-3'
                            />
                            <Field
                                name='fullName'
                                type='text'
                                component={renderField}
                                label='fullname'
                                placeholder='Fullname'
                                className='form-control form-control-lg mt-3'
                            />
                            <Field
                                name='email'
                                type='text'
                                component={renderField}
                                label='email'
                                placeholder='E-mail'
                                className='form-control form-control-lg mt-3'
                            />
                            <Field
                                name='password'
                                type='password'
                                component={renderField}
                                label='Password'
                                placeholder='Password'
                                className='form-control form-control-lg mt-3'
                            />
                            <Button
                                className='mt-3'
                                disabled={submitting}
                                color='danger'
                                size='lg'
                                block
                            >
                                Register
                            </Button>
                            {submitting && <Spinner className='mt-3' color='dark'/>}
                        </FormGroup>
                        <div className='text-center col-lg-10 offset-lg-1'>
                            <p>
                                By signing up, you agree to share high quality photos of cats on
                                a daily basis.
                            </p>
                        </div>
                    </div>
                </Form>
                <Form className='bg-white mt-3'>
                    <div className='border'>
                        <FormGroup className='text-center register_acc mt-2'>
                            <p className='pt-2'>
                                Have an account?
                                <Link to='/login' className='pl-1 text-danger'>
                                    Log in
                                </Link>
                            </p>
                        </FormGroup>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Register;
