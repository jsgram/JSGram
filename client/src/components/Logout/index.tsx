import React from 'react';
import { history } from '../../history';
import { logOut } from '../../store/login/actions';

export class Logout extends React.Component<any> {
    public componentWillMount() {
         logOut();
         history.push('/login');
    }

    public render() {
        return null;
    }
}