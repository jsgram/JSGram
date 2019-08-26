import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Main } from '../components/Main/Landing';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../components/Register/RegisterContainer';
import ChangePassword from '../components/ForgotPassword/ChangePassword';
import CheckEmail from '../components/ForgotPassword/CheckEmail';
import ProfileContainer from '../containers/ProfileContainer';
import { PublicRoute } from './PublicRoute';
import Feed from '../components/Main/Feed';
import Logout from '../containers/LogoutContainer';
import { history } from '../history';
import Sidebar from '../components/Sidebar';
import AddPostContainer from '../containers/AddPostContainer';

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path='/profile' component={ProfileContainer} />
            <Route path='/add-post' component={AddPostContainer} />
            <Route exact path='/feed' component={Feed} />
            <Route path='/profile/edit' component={Sidebar} />
            <Route exact path='/logout' component={Logout} />
            <PublicRoute exact path='/' component={Main} />
            <PublicRoute path='/login/:token?' component={LoginContainer} />
            <PublicRoute exact path='/password-reset' component={CheckEmail} />
            <PublicRoute exact path='/password-reset/:token' component={ChangePassword} />
            <div className='container-fluid header'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-sm-8 col-md-6 col-xl-5'>
                        <PublicRoute exact path='/register' component={RegisterContainer} />
                    </div>
                </div>
            </div>
        </Switch>
    </Router>
);
