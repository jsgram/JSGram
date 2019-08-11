import React from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from "react-router-dom";

import '../styles/CommonStyle.scss';
import logo from '../assets/logo.png';

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
      <div>
        <Form className="mt-4 bg-white" onSubmit={e => {
          e.preventDefault();
          const user = {
            username: this.props.username,
            fullName: this.props.fullname,
            email: this.props.email,
            password: this.props.password
          };
          this.props.registerUser(user);
        }
        }>
          <div className="border">
            <FormGroup className="col-lg-10 offset-lg-1 text-center">
              <Link to="/"><img className="picture" src={logo} alt="logo" /></Link>
              <p>Sign up to see photos from your friends.</p>
              <div className="or-devider">
                <span></span>OR<span></span>
              </div>
              <Input className="form-control form-control-lg mt-3"
                name="username"
                type="text"
                autoComplete="off"
                placeholder="Username"
                spellCheck={false}
                value={this.props.username}
                onChange={this.onUsernameChange}
              />
              <Input className="form-control form-control-lg mt-3"
                name="fullname"
                type="text"
                autoComplete="off"
                placeholder="Fullname"
                spellCheck={false}
                value={this.props.fullname}
                onChange={this.onFullnameChange}
              />
              <Input className="form-control form-control-lg mt-3"
                name="email"
                type="text"
                autoComplete="off"
                placeholder="E-mail"
                spellCheck={false}
                value={this.props.email}
                onChange={this.onEmailChange}
              />
              <Input className="form-control form-control-lg mt-3"
                name="password"
                type="text"
                autoComplete="off"
                placeholder="Password"
                spellCheck={false}
                value={this.props.password}
                onChange={this.onPasswordChange}
              />
              <Button className="mt-3"
                color="danger"
                size="lg" block>Register</Button>
            </FormGroup>
            <div className="text-center col-lg-10 offset-lg-1">
              <p>By signing up, you agree to share High Quelity photos of cats on a daily basis</p>
            </div>
          </div>
        </Form>
        <Form className="bg-white mt-3">
          <div className="border">
            <FormGroup className="text-center register_acc mt-2">
              <p className="pt-2">Have an account?<Link to="/login" className="pl-1">Log in</Link></p>
            </FormGroup>
          </div>
        </Form>
      </div>
    );
  }
}

export default Register;
