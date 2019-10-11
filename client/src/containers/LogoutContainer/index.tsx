import React from 'react';
import { history } from '../../history';
import { logOut } from '../../store/login/actions';
import { connect } from 'react-redux';

export class Logout extends React.Component<any> {
    public componentWillMount(): void {
        this.props.logOut();
        history.push('/login');
    }
    public render(): null {
        return null;
    }
}

export default connect(
    null,
    { logOut },
)(Logout);
