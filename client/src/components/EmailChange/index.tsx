import React from 'react';
import { connect } from 'react-redux';
import { changeEmail, setEmailText } from '../../store/emailChange/actions';
import { Button, Form, Input, FormGroup, Label, Col } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';

interface IStateToProps {
    setEmailText: any;
    email: string;
    user: IUser;
    changeEmail: any;
}

class Index extends React.Component <IStateToProps> {

    public onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.setEmailText(event.target.value);
    }

    public changeEmail = (): void => {
        this.props.changeEmail(this.props.user, this.props.email);
    }

    public render(): JSX.Element {
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
                                value={this.props.email}
                                onChange={this.onEmailChange}
                            />
                        </Col>
                    </FormGroup>
                    <Button
                        className='align-self-center btn mt-3'
                        color='danger'
                        onClick={this.changeEmail}
                    >
                        <i className='fa fa-edit pr-3'/>
                        Change Email
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: any): {email: string, user: IUser} => ({
    email: state.changeEmail.email,
    user: state.profile.user,
});

const mapDispatchToProps = {
    setEmailText,
    changeEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
