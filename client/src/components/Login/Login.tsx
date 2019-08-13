import React from "react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { renderField } from "../commonComponents/reduxFormFields";
import { Button, Form, FormGroup } from "reactstrap";
import "../styles/style.scss";
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
                  <Link to="/">
                    <img className="picture" src={logo} alt="logo" />
                  </Link>
                  <Field
                    className="form-control form-control-lg"
                    type="text"
                    name="email"
                    placeholder="E-mail"
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
                  {submitting && <Spinner className="mt-3" color="dark" />}
                </FormGroup>
                <div className="or-devider">
                  <span></span>OR<span></span>
                </div>
                <div className="text-center mt-2">
                  <div>
                    <p><i className="fa fa-google-plus" />
                      <a href="#" className="text-danger login_google pl-2">
                        Log in with Google
                    </a>
                    </p>
                  </div>
                  <p className="text-danger forgot-pass">
                    <Link to="/password-reset" className="pl-1 text-danger">
                      Forgot password?
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
            <Form className="bg-white mt-3">
              <div className="border">
                <FormGroup className="text-center register-acc mt-2">
                  <p className="pt-2">
                    Still don't have an account?
                    <Link to="/register" className="pl-1 text-danger">
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
