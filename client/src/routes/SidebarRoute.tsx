import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileEditContainer from '../containers/ProfileEditContainer';
import EmailChange from '../components/EmailChange';
import ProfilePasswordChange from '../components/ProfilePasswordChange';
import ProfileSubscribeTo from '../components/ProfileSubscribeTo';
import ProfilePrivacy from '../components/ProfilePrivacy';

export const SidebarRoute = (
<Switch>
    <Route exact path='/profile/edit' component={ProfileEditContainer} />
    <Route path='/profile/edit/change-email' component={EmailChange} />
    <Route path='/profile/edit/change-password' component={ProfilePasswordChange} />
    <Route path='/profile/edit/subscribe-to' component={ProfileSubscribeTo} />
    <Route path='/profile/edit/privacy' component={ProfilePrivacy} />
</Switch>
);
