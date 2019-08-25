import React from 'react';
import { connect } from 'react-redux';
import { changeEmail, setEmailText } from '../../store/emailChange/actions';
import {Button, Form, Input} from 'reactstrap';

interface IStateToProps {
    setEmailText: any;
    email: string;
    changeEmail: any;
}

class Index extends React.Component <IStateToProps> {

    public onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.setEmailText(event.target.value);
    }

    public render(): JSX.Element {
        return (
            <div className='container'>
                <Form className='mt-4 bg-white text-center p-4'>
                    <h3>Change Email</h3>
                    <Input
                        className='form-control'
                        value={this.props.email}
                        onChange={this.onEmailChange}

                    />
                    <Button
                        className='btn mt-3'
                        color='danger'
                        onClick={this.props.changeEmail}
                    >
                        <i className='fa fa-edit pr-3'/>
                        Change
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: any): {email: string} => ({
    email: state.changeEmail.email,
});

const mapDispatchToProps = {
    setEmailText,
    changeEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
