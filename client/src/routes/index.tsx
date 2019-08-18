import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Main } from '../components/Main/Landing';
import LoginContainer from '../components/Login/LoginContainer';
import RegisterContainer from '../components/Register/RegisterContainer';
import ChangePassword from '../components/ForgotPassword/ChangePassword/ChangePassword';
import CheckEmail from '../components/ForgotPassword/CheckEmail/CheckEmail';
import ProfileContainer from '../components/Profile/ProfileContainer';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import Feed from '../components/Main/Feed';
import { Logout } from '../components/Logout';

import { isToken } from '../store/login/actions';

export const routes = (
    <Router>
        <PublicRoute exact auth={isToken} path='/login' component={LoginContainer} />
        <PublicRoute exact auth={isToken} path='/password-reset' component={CheckEmail} />
        <PublicRoute exact auth={isToken} path='/password-reset/:token' component={ChangePassword} />
        <PrivateRoute auth={isToken} path='/profile' component={ProfileContainer} />
        <Route exact path='/logout' component={Logout} />
        {isToken ? (
            <PrivateRoute exact auth={isToken} path='/' component={Feed} />) : (
            <PublicRoute exact path='/' component={Main} />
            )}
        <div className='container-fluid header'>
            <div className='row justify-content-center align-items-center'>
                <div className='col-sm-8 col-md-6 col-xl-5'>
                    <PublicRoute exact auth={isToken} path='/register' component={RegisterContainer} />
                </div>
            </div>
        </div>
    </Router>
);
