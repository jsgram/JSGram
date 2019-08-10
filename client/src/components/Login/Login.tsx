import React from "react";
import { Field } from "redux-form";
import { Spinner } from "reactstrap";
import { renderField } from "../commonComponents/reduxFormFields";
import { Button, Form, FormGroup } from "reactstrap";
import "../styles/Login.scss";
import logo from "../assets/logo.png";

export default class Login extends React.Component<any> {
  render() {
    const { handleSubmit, onSubmit, submitting } = this.props;
    return (
      <div className="container-fluid header">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-8 col-md-6 col-xl-5">
            <Form className="mt-4 bg-white" onSubmit={handleSubmit(onSubmit)}>
              <div className="border">
                <FormGroup className="col-lg-10 offset-lg-1 text-center">
                  <img className="picture" src={logo} alt="logo" />
                  <Field
                    className="form-control form-control-lg"
                    type="text"
                    name="email"
                    autoComplete="off"
                    placeholder="E-mail"
                    spellCheck={false}
                    component={renderField}
                  />
                  <Field
                    className="form-control form-control-lg mt-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    component={renderField}
                  />
                  <Button
                    className="mt-3"
                    color="danger"
                    disabled={submitting}
                    size="lg"
                    block
                  >
                    Log In
                  </Button>
                  {submitting && <Spinner color="dark" />}
                </FormGroup>
                <div className="d-flex justify-content-around line">
                  <div>
                    <span />
                    OR
                    <span />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p>
                    <img
                      className="logo pb-1"
                      src="https://www.armstrongsgroup.com/wp-content/uploads/2017/03/facebook-logo-black-and-white-png.png"
                      alt="Facebook logo"
                    />
                    <a href="#" className="text-danger login-soft">
                      Log in with Facebook
                    </a>
                  </p>
                  <p>
                    <a href="#" className="text-danger forgot-pass">
                      Forgot password?
                    </a>
                  </p>
                </div>
              </div>
            </Form>
            <Form className="bg-white mt-3">
              <div className="border">
                <FormGroup className="text-center register-acc mt-2">
                  <p className="pt-2">
                    Still don't have an account?
                    <a href="#" className="pl-1 text-danger">
                      Register
                    </a>
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
