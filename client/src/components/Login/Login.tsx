import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from "react-router-dom";

import '../styles/CommonStyle.scss';
import logo from '../assets/logo.png';

interface FormProps {
  email: string;
  password: string;
  setEmailText: Function;
  setPasswordText: Function;
  getApiData: Function;
}

export default class Login extends React.Component<FormProps> {

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setEmailText(event.target.value);
  };

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setPasswordText(event.target.value);
  };

  onGetToken = () => {
    this.props.getApiData();
  };

  render() {
    return (
      <div className="container-fluid header">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-8 col-md-6 col-xl-5">
            <Form className="mt-4 bg-white">
              <div className="border">
                <FormGroup className="col-lg-10 offset-lg-1 text-center">
                  <Link to="/"><img className="picture" src={logo} alt="logo" /></Link>
                  <Input className="form-control form-control-lg"
                    type="text"
                    name="login"
                    autoComplete="off"
                    placeholder="E-mail"
                    spellCheck={false}
                    value={this.props.email}
                    onChange={this.onEmailChange}
                  />
                  <Input className="form-control form-control-lg mt-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.props.password}
                    onChange={this.onPasswordChange}
                  />
                  <Button className="mt-3"
                    color="danger"
                    onClick={this.onGetToken}
                    size="lg" block>Log In</Button>
                </FormGroup>
                <div className="or-devider">
                  <span></span>OR<span></span>
                </div>
                <div className="text-center mt-2">
                  <p><img className="logo pb-1"
                    src="https://www.armstrongsgroup.com/wp-content/uploads/2017/03/facebook-logo-black-and-white-png.png"
                    alt="Facebook logo" /><a href="#" className="text-danger login-soft">Log in with Facebook</a></p>
                  <p className=""><Link to="/password-reset" className="pl-1">Forgot password?</Link></p>
                </div>
              </div>
            </Form>
            <Form className="bg-white mt-3">
              <div className="border">
                <FormGroup className="text-center register-acc mt-2">
                  <p className="pt-2">Still don't have an account?<Link to="/register" className="pl-1">Register</Link></p>
                </FormGroup>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}