import React from 'react';
import { Formik } from 'formik';
import { Button, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import './../ValidationStyle.scss';
import './Login.scss';
import logo from '../../logo.png';

interface FormProps {
  email: string;
  password: string;
  setEmailText: Function;
  setPasswordText: Function;
  getApiData: Function;
}

export default class Login extends React.Component<FormProps> {
  constructor(props: FormProps) {
    super(props);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onGetToken = this.onGetToken.bind(this);
  }

  onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.setEmailText(event.target.value);
  }

  onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.setPasswordText(event.target.value);
  }

  onGetToken() {
    this.props.getApiData();
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Please Enter an valid Email')
            .required('Email is required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        })}
        onSubmit={fields => {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 2))
        }}
      >

        {props => {
          const { touched, errors, handleChange, handleBlur, handleSubmit, values } = props;
          return (
            <div className="container-fluid header">
              <FormGroup className="row justify-content-center align-items-center">
                <FormGroup className="col-sm-8 col-md-6 col-lg-6 col-xl-5">
                  <Form className="mt-4 bg-white" onSubmit={handleSubmit}>
                    <div className="border">
                      <FormGroup className="text-center">
                        <img className="picture" src={logo} alt="JSGram" />
                      </FormGroup>
                      <FormGroup className="col-lg-10 offset-lg-1">
                        <input className={(errors.email && touched.email ? 'form-control is-invalid' : !values.email ? 'form-control' : errors.email ? 'form-control is-invalid' : 'form-control is-valid')}
                          type="email"
                          name="email"
                          placeholder="Email"
                          onBlur={handleBlur}
                          onChange={(event) => { this.onEmailChange(event); handleChange(event) }}
                          value={this.props.email}
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                      </FormGroup>
                      <FormGroup className="col-lg-10 offset-lg-1">
                        <input className={(errors.password && touched.password ? 'form-control is-invalid' : !values.password ? 'form-control' : errors.password ? 'form-control is-invalid' : 'form-control is-valid')}
                          type="password"
                          name="password"
                          placeholder="Password"
                          onBlur={handleBlur}
                          onChange={(event) => { this.onPasswordChange(event); handleChange(event) }}
                          value={this.props.password}

                        />
                        {errors.password && touched.password && (
                          <div className="input-feedback">{errors.password}</div>
                        )}
                      </FormGroup>
                      <FormGroup className="col-lg-10 offset-lg-1">
                        <Button color="danger" size="lg" onSubmit={() => this.onGetToken} block>Log In</Button>
                      </FormGroup>
                      <div className="or-devider">
                        <span></span>OR<span></span>
                      </div>
                      <FormGroup className="text-center login_soft mt-2">
                        <p><img className="logo pb-1"
                          src="https://www.armstrongsgroup.com/wp-content/uploads/2017/03/facebook-logo-black-and-white-png.png"
                          alt=" " /><a href="#">Log in with Facebook</a></p>
                      </FormGroup>
                      <FormGroup className="text-center forgot_pass mt-2">
                        <p className=""><Link to="/auth/password/reset" className="pl-1">Forgot password?</Link></p>
                      </FormGroup>
                    </div>
                  </Form>
                  <Form className="bg-white mt-3">
                    <div className="border">
                      <FormGroup className="text-center register_acc mt-2">
                        <p className="pt-2">Still don't have an account?<Link to="/auth/register" className="pl-1">Register</Link></p>
                      </FormGroup>
                    </div>
                  </Form>
                </FormGroup>
              </FormGroup>
            </div>);
        }
        }
      </Formik>
    );
  }
}
