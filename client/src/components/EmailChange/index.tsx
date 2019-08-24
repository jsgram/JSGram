import React from 'react';
import { connect } from 'react-redux';
import { changeEmail, setEmailText } from '../../store/emailChange/actions';
import {Button, Form, Input} from 'reactstrap';
import {IUser} from '../../store/commonInterfaces/commonInterfaces';

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
            <div className='container'>
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

const mapStateToProps = (state: any): {email: string, user: IUser} => ({
    email: state.changeEmail.email,
    user: state.profile.user,
});

const mapDispatchToProps = {
    setEmailText,
    changeEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
