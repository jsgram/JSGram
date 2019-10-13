import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Main } from '../components/Main/Landing';
import LoginContainer from '../containers/LoginContainer';
import ChangePassword from '../components/ForgotPassword/ChangePassword';
import CheckEmail from '../components/ForgotPassword/CheckEmail';
import ProfileContainer from '../containers/ProfileContainer';
import { PublicRoute } from './PublicRoute';
import Logout from '../containers/LogoutContainer';
import { history } from '../history';
import SideBar from '../components/SideBar';
import AddPostContainer from '../containers/AddPostContainer';
import { Error404 } from '../components/Error404';
import { RegisterRoute } from '../components/RegisterRoute';
import { PrivateRoute } from './PrivateRoute';
import FeedContainer from '../containers/FeedContainer';
import SubscribersContainer from '../containers/SubscribersContainer';
import { AboutUs } from '../components/AboutUs';
import FriendsRecommendationsList from '../components/FriendsRecommendationsList';
import PostsByTagContainer from '../containers/PostsByTagContainer';
import LikeListContainer from '../containers/LikesListContainer';
import MentionListContainer from '../containers/MentionListContainer';

export const routes = (
    <Router history={history}>
        <Switch>
            <PrivateRoute exact path='/profile/:username' component={ProfileContainer}/>
            <PrivateRoute exact path='/profile/:username/followers' component={SubscribersContainer}/>
            <PrivateRoute exact path='/profile/:username/following' component={SubscribersContainer}/>
            <PrivateRoute exact path='/profile/:username/recommendations' component={FriendsRecommendationsList}/>
            <PrivateRoute exact path='/profile/:username/edit/password-reset' component={CheckEmail}/>
            <PrivateRoute exact path='/profile/:username/likes' component={LikeListContainer} />
            <PrivateRoute exact path='/add-post' component={AddPostContainer}/>
            <PrivateRoute exact path='/feed' component={FeedContainer}/>
            <PrivateRoute exact path='/mentions' component={MentionListContainer}/>
            <PrivateRoute path='/profile/:username/edit' component={SideBar}/>
            <PrivateRoute path='/tag/:tagName' component={PostsByTagContainer}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/about-us' component={AboutUs}/>
            <PublicRoute exact path='/' component={Main}/>
            <PublicRoute path='/login/:token?' component={LoginContainer}/>
            <PublicRoute exact path='/password-reset' component={CheckEmail}/>
            <PublicRoute exact path='/password-reset/:token' component={ChangePassword}/>
            <PublicRoute exact path='/register' component={RegisterRoute}/>
            <Route component={Error404}/>
        </Switch>
    </Router>
);
