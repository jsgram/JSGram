import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileEditContainer from '../containers/ProfileEditContainer';
import EmailChange from '../components/EmailChange';
import ProfilePasswordChange from '../components/ProfilePasswordChange';
import ProfileSubscribeTo from '../components/ProfileSubscribeTo';
import ProfilePrivacy from '../components/ProfilePrivacy';

export const SidebarRoute = (
<Switch>
    <Route exact path='/profile/:username/edit' component={ProfileEditContainer} />
    <Route path='/profile/:username/edit/change-email' component={EmailChange} />
    <Route path='/profile/:username/edit/change-password' component={ProfilePasswordChange} />
    <Route path='/profile/:username/edit/subscribe-to' component={ProfileSubscribeTo} />
    <Route path='/profile/:username/edit/privacy' component={ProfilePrivacy} />
</Switch>
);
