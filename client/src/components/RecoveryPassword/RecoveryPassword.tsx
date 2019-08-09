import React from 'react';
import API from '../../store/api';

interface State {
  status: boolean;
}

interface Request {
  password: string;
}

export class RecoveryEmail extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      status: false,
    };
  }

  async submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const el: HTMLFormElement = event.target as HTMLFormElement;

    if (el.value[0] !== el.value[1]) return;

    const payload = { password: el.value[0] };
    API.put('/forgot-password', payload)
                .then(res => {
                  window.location.href = '/';
                })
                .catch(e => this.setState({ status: true }));
  };

  render() {
    const messageError: string = 'Passwords should match';
    const message: null | string = this.state.status
      ? messageError
      : null;

    // TODO alert
    return (
      <React.Fragment>
        <img src="assets/logo.png" alt="JSgram Logo" />
        <h1>Password recovery</h1>
        <p>Enter your new password.</p>
        <form onSubmit={event => this.submitHandler(event)}>
          <label htmlFor="password">New password:</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            maxLength={32}
            required
          />
          <label htmlFor="password-confirmation">New password confirmation:</label>
          <input
            id="password-confirmation"
            name="password-confirmation"
            type="password-confirmation"
            minLength={8}
            maxLength={32}
            required
          />
          <input type="submit" value="Reset Password" />
        </form>
      </React.Fragment>
    );
  }
}
