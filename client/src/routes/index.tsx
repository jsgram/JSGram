import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Main } from '../components/Main/Landing';
import LoginContainer from '../containers/LoginContainer';
import ChangePassword from '../components/ForgotPassword/ChangePassword';
import CheckEmail from '../components/ForgotPassword/CheckEmail';
import ProfileContainer from '../containers/ProfileContainer';
import { PublicRoute } from './PublicRoute';
import { Feed } from '../components/Main/Feed';
import Logout from '../containers/LogoutContainer';
import { history } from '../history';
import SideBar from '../components/SideBar';
import AddPostContainer from '../containers/AddPostContainer';
import { Error404 } from '../components/Error404';
import { RegisterRoute } from '../components/RegisterRoute';
import { PrivateRoute } from './PrivateRoute';

export const routes = (
    <Router history={history}>
        <Switch>
            <PrivateRoute exact path='/profile/:username' component={ProfileContainer}/>
            <PrivateRoute exact path='/add-post' component={AddPostContainer}/>
            <PrivateRoute exact path='/feed' component={Feed}/>
            <PrivateRoute path='/profile/:username/edit' component={SideBar}/>
            <Route exact path='/logout' component={Logout}/>
            <PublicRoute exact path='/' component={Main}/>
            <PublicRoute path='/login/:token?' component={LoginContainer}/>
            <PublicRoute exact path='/password-reset' component={CheckEmail}/>
            <PublicRoute exact path='/password-reset/:token' component={ChangePassword}/>
            <PublicRoute exact path='/register' component={RegisterRoute}/>
            <Route component={Error404}/>
        </Switch>
    </Router>
);
