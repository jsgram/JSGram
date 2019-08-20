import React from 'react';
import Login from './Login';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../store/login/actions';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';
import {setToken} from '../../store/login/setToken.helper';

export class LoginContainer extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public onSubmit(user: IUser): void {
        return this.props.loginUser(user);
    }

    // TODO Refactor after authorization
    public componentDidMount(): void {
        const {token}: { token: string } = this.props.match.params;
        if (token) {
            setToken(token);
        }
    }

    public render(): JSX.Element {
        const {handleSubmit, submitting}: FormProps = this.props;
        return (
            <Login
                handleSubmit={handleSubmit}
                onSubmit={this.onSubmit}
                submitting={submitting}
            />
        );
    }
}

export default connect(
    null,
    {loginUser},
)(
    reduxForm({
        form: 'loginForm',
        validate,
    })(LoginContainer),
);
