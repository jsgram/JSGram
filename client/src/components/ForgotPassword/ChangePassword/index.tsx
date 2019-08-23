import React from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../../../store/changePassword/actions';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../utils/validation';
import { Button, Form, FormGroup, FormProps, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { renderField } from '../../CommonComponents/ReduxFormFields';
import { IUser } from '../../../store/commonInterfaces/commonInterfaces';

export class ChangePasswordContainer extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(password: IUser): void {
        return this.props.changePassword(password, this.props.match.params.token);
    }

    public render(): JSX.Element {
        const {handleSubmit, submitting}: FormProps = this.props;
        return (
            <div className='container-fluid header'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-sm-8 col-md-6 col-xl-5'>
                        <Form className='mt-4 bg-white' onSubmit={handleSubmit(this.onSubmit)}>
                            <div className='border'>
                                <FormGroup className='col-lg-10 offset-lg-1 text-center'>
                                    <Link to='/'>
                                        <img className='picture' src={logo} alt='logo'/>
                                    </Link>
                                    <Field
                                        name='password'
                                        type='password'
                                        component={renderField}
                                        label='password'
                                        className='form-control form-control-lg mt-3'
                                        placeholder='Password'
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
                                <FormGroup className='text-center login_soft'>
                                    <p className='pt-2'>
                                        Still don't have an account?
                                        <Link to='/register' className='pl-1'>
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
