import React from "react";

interface FormProps {
    email: string;
    setEmail: Function;
    checkEmail: Function;
}

class CheckEmail extends React.Component<FormProps> {

    onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setEmail(event.target.value);
    };

    onCheckEmail = (event: React.FormEvent<HTMLFormElement>) => {
        const email = {
            email: this.props.email
        };
        this.props.checkEmail(email);
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <h1>Check E-mail</h1>
                <form
                    onSubmit={this.onCheckEmail}
                >
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={this.props.email}
                            onChange={this.onEmailChange}
                        />
                    </div>
                    <div>
                        <button>Check Email</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CheckEmail;
