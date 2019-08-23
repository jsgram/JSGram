import React, { ReactElement } from 'react';
import '../styles/style.scss';
import { Button, Form, Input } from 'reactstrap';
import '../styles/Profile.scss';

const EmailChange = (props: any): ReactElement => {

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.setEmailText(event.target.value);
    };

    const changeEmail = (): void => {
        props.changeEmail();
    };

    return (
        <div>
            <Form className='mt-4 bg-white text-center border p-4'>
                <h3>Change Email</h3>
                <Input
                    className='form-control'
                    value={props.email}
                    onChange={onEmailChange}

                />
                <Button
                    className='btn mt-3'
                    color='danger'
                    onClick={changeEmail}
                >
                    <i className='fa fa-edit pr-3'/>
                    Change
                </Button>
            </Form>
        </div>

    );
};

export default EmailChange;
