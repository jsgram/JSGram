import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import '../assets/styles/Login.scss';
import logo from '../assets/logo.png';


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
      <div className="container-fluid header">
        <FormGroup className="row justify-content-center align-items-center">
          <FormGroup className="col-sm-8 col-md-6 col-xl-5">
            <Form className="mt-4 bg-white">
              <div className="border">
                <FormGroup className="text-center">
                  <img className="picture" src={logo} alt="logo"/>
                </FormGroup>
                <FormGroup className="col-lg-10 offset-lg-1">
                  <Input className="form-control form-control-lg"
                         placeholder="Email Address"
                         type="email"
                         value={this.props.email}
                         onChange={this.onEmailChange}
                  />
                </FormGroup>
                <FormGroup className="col-lg-10 offset-lg-1">
                  <Input className="form-control form-control-lg"
                         placeholder="Password"
                         type="password"
                         value={this.props.password}
                         onChange={this.onPasswordChange}
                  />
                </FormGroup>
                <FormGroup className="col-lg-10 offset-lg-1">
                  <Button color="danger"
                          onClick={this.onGetToken}
                          size="lg" block>Log In</Button>
                </FormGroup>
                <div className="d-flex justify-content-around line">
                  <div><span></span>OR<span></span></div>
                </div>
                <FormGroup className="text-center login-soft mt-2">
                  <p><img className="logo pb-1"
                          src="https://www.armstrongsgroup.com/wp-content/uploads/2017/03/facebook-logo-black-and-white-png.png"
                          alt="Facebook logo"/><a href="#" className="text-danger">Log in with Facebook</a></p>
                </FormGroup>
                <FormGroup className="text-center forgot-pass mt-2">
                  <p><a href="#" className="text-danger">Forgot password?</a></p>
                </FormGroup>
              </div>
            </Form>
            <Form className="bg-white mt-3">
              <div className="border">
                <FormGroup className="text-center register-acc mt-2">
                  <p className="pt-2">Still don't have an account?<a href="#" className="pl-1 text-danger">Register</a></p>
                </FormGroup>
              </div>
            </Form>
          </FormGroup>
        </FormGroup>
      </div>
    );
  }
}
