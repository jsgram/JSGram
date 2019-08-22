import React from 'react';
import '../styles/style.scss';
import {Button, Form, FormProps, Input} from 'reactstrap';
import '../styles/Profile.scss';

export default class EmailChange extends React.Component<any> {

    constructor(props: FormProps) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }

    public onEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.props.setEmailText(event.target.value);
    }

    public changeEmail(): void {
        this.props.changeEmail();
    }

    public render(): JSX.Element {
        return (
            <div>
                <Form className='mt-4 bg-white text-center border p-4'>
                    <h3>Change Email</h3>
                    <Input
                        className='form-control'
                        value={this.props.email}
                        onChange={this.onEmailChange}

                    />
                    <Button
                        className='btn mt-3'
                        color='danger'
                        onClick={this.changeEmail}
                    >
                        <i className='fa fa-edit pr-3'/>
                        Change
                    </Button>
                </Form>
            </div>

        );
    }
}
