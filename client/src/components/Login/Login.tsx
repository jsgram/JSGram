import React from 'react';

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
            <div>
                <h3>Sign In</h3>
                <form>
                    <div>
                        <input
                            type="text"
                            name="login"
                            autoComplete="off"
                            placeholder="E-mail"
                            spellCheck={false}
                            value={this.props.email}
                            onChange={this.onEmailChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.props.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <div>
                        <p onClick={this.onGetToken}>Sign In</p>
                    </div>
                </form>
            </div>
        );
    }
}