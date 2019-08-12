import React from "react";
import { Button, Form, FormGroup } from 'reactstrap';
import { Link } from "react-router-dom";

import './../../styles/CommonStyle.scss';
import logo from './../../assets/logo.png';

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
            <div className="container-fluid header">
                <div className="row justify-content-center align-items-center">
                    <div className="col-sm-8 col-md-6 col-xl-5">
                        <Form className="mt-4 bg-white" onSubmit={this.onCheckEmail}>
                            <div className="border">
                                <FormGroup className="col-lg-10 offset-lg-1 text-center">
                                    <Link to="/"><img className="picture" src={logo} alt="logo" /></Link>
                                    <input className="form-control form-control-lg mt-3"
                                        type="text"
                                        name="email"
                                        autoComplete="off"
                                        placeholder="E-mail"
                                        spellCheck={false}
                                        value={this.props.email}
                                        onChange={this.onEmailChange}
                                    />
                                    <Button className="mt-3" color="danger" size="lg" block>Send</Button>
                                </FormGroup>
                                <div className="or-devider">
                                    <span></span>OR<span></span>
                                </div>
                                <FormGroup className="text-center login_soft">
                                    <p className="pt-2">
                                        Still don't have an account?
                                        <Link to="/register" className="pl-1">Register</Link>
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

export default CheckEmail;
