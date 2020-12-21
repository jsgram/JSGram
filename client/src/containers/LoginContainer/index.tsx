import React from 'react';
import Login from '../../components/Login';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../store/login/actions';
import validate from '../../utils/validation';
import { FormProps } from 'reactstrap';
import { IUser } from '../../store/commonInterfaces/commonInterfaces';
import { setToken } from '../../store/login/setToken.helper';
import { history } from '../../history';

export class LoginContainer extends React.Component<any> {
    public componentWillMount(): void {
        const {token}: { token: string } = this.props.match.params;
        if (token) {
            setToken(token);
            history.push('/feed');
        }
    }

    public onSubmit = (user: IUser): void => this.props.loginUser(user);

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
