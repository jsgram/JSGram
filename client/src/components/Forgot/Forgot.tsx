import React from 'react';
import { Formik } from 'formik';
import { Button, Form, FormGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import * as Yup from 'yup';

import API from '../../store/api';

import './../assets/styles/ValidationStyle.scss';
import logo from './../assets/img/logo.png';

interface FormProps {
  email: string;
}

export default class Forgot extends React.Component<FormProps> {
  async submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
    const messageSuccess: string = `Thanks! Please check ${this.state.status} for a link to reset your password. `;
    const messageError: string = 'No users found';
    // null is no alert, false is error alert, true is success alert
    */

    const el: HTMLFormElement = event.target as HTMLFormElement;
    const payload: FormProps = { email: el.value[0] };
    API.post('/forgot-password', payload)
       .then(res => res) // TODO alert
       .catch(e => { throw new Error(e) });
  };

  render() {
    return (
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Please Enter an valid Email')
            .required('Email is required')
        })}
        onSubmit={() => {}}
      >

        {props => {
          const { touched, errors, handleChange, handleBlur, handleSubmit, values } = props;
          return (
            <div className="container-fluid header">
              <FormGroup className="row justify-content-center align-items-center">
                <FormGroup className="col-sm-8 col-md-6 col-lg-6 col-xl-4">
                  <Form className="mt-4 bg-white" onSubmit={event => this.submitHandler(event)}>
                    <div className="border">
                      <FormGroup className="text-center">
                        <img className="picture" src={logo} alt="JSGram" />
                      </FormGroup>
                      <FormGroup className="text-center login_soft">
                        <p className="pt-2 font-weight-bold">Trouble Logging In?</p>
                        <p className="text-center pt-2 pl-5 pr-5 text-justify">Enter your email and we'll send you a link to get back into your account.</p>
                      </FormGroup>
                      <FormGroup className="col-lg-10 offset-lg-1">
                        <input className={(errors.email && touched.email ? 'form-control is-invalid' : !values.email ? 'form-control' : errors.email ? 'form-control is-invalid' : 'form-control is-valid')}
                          type="email"
                          name="email"
                          placeholder="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                      </FormGroup>
                      <FormGroup className="col-lg-10 offset-lg-1">
                        <Button color="danger" size="lg" block>Send</Button>
                      </FormGroup>
                      <div className="or-devider">
                        <span></span>OR<span></span>
                      </div>
                      <FormGroup className="text-center login_soft">
                        <p className="pt-2">
                          Still don't have an account?
                          <Link to="/auth/register" className="pl-1">Register</Link>
                        </p>
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
