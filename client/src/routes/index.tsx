import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Main } from '../components/Main/Landing';
import LoginContainer from '../containers/LoginContainer/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer/RegisterContainer';
import ChangePassword from '../components/ForgotPassword/ChangePassword';
import CheckEmail from '../components/ForgotPassword/CheckEmail';
import ProfileContainer from '../components/Profile/';
import { PublicRoute } from './PublicRoute';
import Feed from '../components/Main/Feed';
import Logout from '../containers/LogoutContainer/LogoutContainer';
import { history } from '../history';

export const routes = (
    <Router history={history}>
        <Route path='/profile' component={ProfileContainer} />
        <Route exact path='/feed' component={Feed} />
        <Route exact path='/logout' component={Logout} />
        <PublicRoute exact path='/' component={Main} />
        <PublicRoute exact path='/login' component={LoginContainer} />
        <PublicRoute exact path='/password-reset' component={CheckEmail} />
        <PublicRoute exact path='/password-reset/:token' component={ChangePassword} />
        <div className='container-fluid header'>
            <div className='row justify-content-center align-items-center'>
                <div className='col-sm-8 col-md-6 col-xl-5'>
                    <PublicRoute exact path='/register' component={RegisterContainer} />
                </div>
            </div>
        </div>
    </Router>
);
