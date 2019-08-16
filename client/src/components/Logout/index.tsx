import React from 'react';
import { history } from '../../history';

export class Logout extends React.Component<any> {
    logOut() {
        localStorage.removeItem('TOKEN');
    }
    componentDidMount() {
        this.logOut();
        history.push('/');
    }
    render() {
        return <p>Bye bye</p>
    }

}
