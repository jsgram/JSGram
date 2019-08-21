import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Main } from '../components/Main/Landing';
import LoginContainer from '../components/Login/LoginContainer';
import RegisterContainer from '../components/Register/RegisterContainer';
import ChangePassword from '../components/ForgotPassword/ChangePassword/ChangePassword';
import CheckEmail from '../components/ForgotPassword/CheckEmail/CheckEmail';
import ProfileContainer from '../components/Profile/ProfileContainer';
import { PublicRoute } from './PublicRoute';
import Feed from '../components/Main/Feed';
import Logout from '../components/Logout/LogoutContainer';
import { history } from '../history';
import AddPost from '../components/AddPost/AddPost';

export const routes = (
    <Router history={history}>
        <Route path='/profile' component={ProfileContainer} />
        <Route path='/add-post' component={AddPost} />
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
