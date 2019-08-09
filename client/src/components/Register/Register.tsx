import React from "react";

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
        <h1>Register</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            const user = {
              username: this.props.username,
              fullName: this.props.fullname,
              email: this.props.email,
              password: this.props.password
            };
            this.props.registerUser(user);
          }}
        >
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={this.props.username}
              onChange={this.onUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="fullname">Fullname: </label>
            <input
              type="text"
              name="fullname"
              value={this.props.fullname}
              onChange={this.onFullnameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              value={this.props.email}
              onChange={this.onEmailChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={this.props.password}
              onChange={this.onPasswordChange}
            />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
