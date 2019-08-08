import React from "react";
import {Input, Button, Form, FormGroup} from 'reactstrap';
import './Register.css';
import './devices.min.css';

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
      <div className="App">
        {/* <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="devices.min.css" type="text/css">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <link href="style.css" rel="stylesheet">
        </head> */}
        <body>
          <div className="container">
            <div id="right-bl" className="row">
              <div className=" d-none col-lg-6 d-lg-block col-xl-6 d-xl-block">
                <div className="marvel-device iphone4s silver babe">
                  <div className="top-bar"></div>
                  <div className="sleep"></div>
                  <div className="volume"></div>
                  <div className="camera"></div>
                  <div className="sensor"></div>
                  <div className="speaker"></div>
                  <div className="screen">
                    <p className="text-center"><img src='/images/cat.jpg' className="cat" alt="cat" /></p>
                  </div>
                  <div className="home"></div>
                  <div className="bottom-bar"></div>
                </div>
              </div>
              <div className="col-md-10 col-lg-4  col-xl-4 col-sm-10 col-xs-10 form">
                <p className="text-center"><img src='/images/logo.jpg' className="Logo" alt="logo" /></p>
                <Form className="forma" onSubmit={e => {
                  e.preventDefault();
                  const user = {
                    username: this.props.username,
                    fullName: this.props.fullname,
                    email: this.props.email,
                    password: this.props.password
                  };
                  this.props.registerUser(user);
                }}>
                  <h1 className="text-center small font-weight-italic" color="black">Register to see photos and videos from your friends.</h1>
                    <Button outline color="danger" size="lg" className="but" block>Register with Facebook</Button>
                  <div className="d-flex justify-content-around">
                    <div className="col-lg-5 "><hr /></div>
                    <div>OR</div>
                    <div className="col-lg-5 "><hr /></div>
                  </div>
                  <FormGroup className="field1">
                    <Input className="email" value={this.props.email}
                      onChange={this.onEmailChange} type="email" placeholder="Email" />
                  </FormGroup>
                  <FormGroup className="field2">
                    <Input className="fullname" value={this.props.fullname}
                      onChange={this.onFullnameChange} type="text" placeholder="Fullname" />
                  </FormGroup>
                  <FormGroup className="field3">
                    <Input value={this.props.username}
                      onChange={this.onUsernameChange} className="username" type="text" placeholder="Username" />
                  </FormGroup>
                  <FormGroup className="field4">
                    <Input className="password" value={this.props.password}
                      onChange={this.onPasswordChange} type="password" placeholder="Password" />
                  </FormGroup>
                  <Button className="bt" color="danger" size="lg" block>Register</Button>
                </Form>
                <h6 id="agreement">By signing up, you agree to share <span className="text-center"> High Quality</span> photos
            of <span className="colortext"> cats</span> on a <span className="colortext">daily</span> basis.</h6>
                <div className="bottom row">
                  <p className="question col-6">Have an account?</p>
                  <a className="hyperlink col-3 font-weight-bold" color="danger" href="#">Log in</a>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </body>
        <footer className="footer navbar-fixed-bottom">
          <div className="row-bottom">
            <div className="col-lg-5 offset-lg-5">
              <a className="pr-3 hyperlink" href="#">About us</a>
              <a className="pr-3 hyperlink" href="#">Github</a>
              <a className="pr-3 hyperlink" href="#">Demos</a>
              <a className="pr-3 hyperlink" href="#">Softserve</a>
              <span>JSGram ©2019</span>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
export default Register;
