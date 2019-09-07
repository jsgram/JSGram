import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileEditContainer from '../containers/ProfileEditContainer';
import EmailChange from '../components/EmailChange';
import ProfilePasswordChange from '../components/ProfilePasswordChange';
import ProfileSubscriptionsContainer from '../containers/ProfileSubscriptionsContainer';
import ProfilePrivacyContainer from '../containers/ProfilePrivacyContainer';

export const SidebarRoute = (
<Switch>
    <Route exact path='/profile/:username/edit' component={ProfileEditContainer} />
    <Route exact path='/profile/:username/edit/change-email' component={EmailChange} />
    <Route exact path='/profile/:username/edit/change-password' component={ProfilePasswordChange} />
    <Route exact path='/profile/:username/edit/subscriptions' component={ProfileSubscriptionsContainer} />
    <Route exact path='/profile/:username/edit/privacy' component={ProfilePrivacyContainer} />
</Switch>
);
