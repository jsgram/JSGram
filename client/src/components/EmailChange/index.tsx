import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/emailChange/actions';
import { Button, Form, Input, FormGroup, Label, Col } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';

interface IStateToProps {
    setEmailText: (email: string) => void;
    email: string;
    user: IUser;
    changeEmail: (profileUser: IUser, newEmail: string) => void;
}

interface ILocalState {
    changeEmail: {
        email: string,
    };
    profile: {
        user: IUser,
    };
}

const Index = ({setEmailText, email, user, changeEmail: mailChange}: IStateToProps): any => {
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmailText(event.target.value);
    };

    const changeEmail = (): void => {
        mailChange(user, email);
    };

    return (
        <div>
            <h3 className='text-center font-weight-light text-secondary text-uppercase'>Change Email</h3>
            <Form className='d-flex flex-column mt-3 bg-white p-4'>
                <FormGroup row className='align-items-center'>
                    <Label className='col-sm-3 m-0'>
                        Change Email
                    </Label>
                    <Col className='col-sm-9'>
                        <Input
                            className='form-control'
                            value={email}
                            onChange={onEmailChange}
                        />
                    </Col>
                </FormGroup>
                <Button
                    className='align-self-center btn mt-3'
                    color='danger'
                    onClick={changeEmail}
                >
                    <i className='fa fa-edit pr-2'/>
                    Change Email
                </Button>
            </Form>
        </div>
    );
};

const mapStateToProps = (state: ILocalState): { email: string, user: IUser } => ({
    email: state.changeEmail.email,
    user: state.profile.user,
});

const mapDispatchToProps = {
    setEmailText: action.setEmailText,
    changeEmail: action.changeEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
