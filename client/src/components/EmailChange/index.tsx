import React from 'react';
import { connect } from 'react-redux';
import { changeEmail, setEmailText } from '../../store/emailChange/actions';
import { Button, Form, Input, Container, FormGroup, Label, Col } from 'reactstrap';

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
            <Container>
                <Form className='mt-4 bg-white text-center p-4'>
                    <FormGroup row>
                        <Label className='col-sm-3'>
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
                        className='btn mt-3'
                        color='danger'
                        onClick={this.props.changeEmail}
                    >
                        <i className='fa fa-edit pr-3'/>
                        Change Email
                    </Button>
                </Form>
            </Container>
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
