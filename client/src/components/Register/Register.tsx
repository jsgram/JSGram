import React from "react";
import { Formik } from 'formik';
import { Button, Form, FormGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import * as Yup from 'yup';

import './../assets/styles/ValidationStyle.scss';
import logo from './../assets/img/logo.png';

interface FormProps {
  username: string;
  fullname: string;
  email: string;
  password: string;
  setUsername: Function;
  setFullname: Function;
  setEmail: Function;
  setPassword: Function;
  registerUser: Function;
}

class Register extends React.Component<FormProps> {
  onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setUsername(event.target.value);
  };
  onFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setFullname(event.target.value);
  };

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setEmail(event.target.value);
  };

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setPassword(event.target.value);
  };

  render() {
    return (
      <Formik
        initialValues={{
          fullname: '',
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          fullname: Yup.string()
            .required('Fullname is required'),
          username: Yup.string()
            .required('Username is required'),
          email: Yup.string()
            .email('Please Enter an valid Email')
            .required('Email is required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        })}
        onSubmit={() => {
          // TODO it will be implememted later
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
                        <FormGroup className="text-center login_soft mt-2">
                          <p>Sign up to see photos from your friends.</p>
                        </FormGroup>
                        <FormGroup className="text-center login_soft mt-2">
                          <p><img className="logo pb-1"
                            src="https://www.armstrongsgroup.com/wp-content/uploads/2017/03/facebook-logo-black-and-white-png.png"
                            alt="Log in with Facebook" /><a href="#">Log in with Facebook</a></p>
                        </FormGroup>
                        <div className="or-devider mb-3">
                          <span></span>OR<span></span>
                        </div>
                        <FormGroup className="col-lg-10 offset-lg-1">
                          <input className={(errors.email && touched.email ? 'form-control is-invalid' : !values.email ? 'form-control' : errors.email ? 'form-control is-invalid' : 'form-control is-valid')}
                            type="email"
                            name="email"
                            placeholder="Email"
                            onBlur={handleBlur}
                            onChange={(event) => { this.onEmailChange(event) ; handleChange(event) }}
                            value={this.props.email}
                          />
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                        </FormGroup>
                        <FormGroup className="col-lg-10 offset-lg-1">
                          <input className={(errors.fullname && touched.fullname ? 'form-control is-invalid' : !values.fullname ? 'form-control' : errors.fullname ? 'form-control is-invalid' : 'form-control is-valid')}
                            type="text"
                            name="fullname"
                            placeholder="Fullname"
                            onBlur={handleBlur}
                            onChange={(event) => { this.onFullnameChange(event); handleChange(event) }}
                            value={this.props.fullname}                          />
                          {errors.fullname && touched.fullname && (
                            <div className="input-feedback">{errors.fullname}</div>
                          )}                       
                        </FormGroup>
                        <FormGroup className="col-lg-10 offset-lg-1">
                          <input className={(errors.username && touched.username ? 'form-control is-invalid' : !values.username ? 'form-control' : errors.username ? 'form-control is-invalid' : 'form-control is-valid')}
                            type="text"
                            name="username"
                            placeholder="Username"
                            onBlur={handleBlur}
                            onChange={(event) => { this.onUsernameChange(event); handleChange(event) }}
                            value={this.props.username}                          />
                          {errors.username && touched.username && (
                            <div className="input-feedback">{errors.username}</div>
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
                          <Button color="danger" size="lg" block>Register</Button>
                        </FormGroup>
                        <FormGroup className="text-center col-lg-10 offset-lg-1">
                          <p>By signing up, you agree to share High Quelity photos of cats on a daily basis</p>
                        </FormGroup>
                      </div>
                    </Form>
                    <Form className="bg-white mt-3">
                      <div className="border">
                        <FormGroup className="text-center register_acc mt-2">
                          <p className="pt-2">Have an account?<Link to="/auth/login" className="pl-1">Log in</Link></p>
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

export default Register;