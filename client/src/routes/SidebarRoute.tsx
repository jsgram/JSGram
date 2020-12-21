import React from 'react';
import { Switch } from 'react-router-dom';
import ProfileEditContainer from '../containers/ProfileEditContainer';
import EmailChange from '../components/EmailChange';
import ProfilePasswordChange from '../components/ProfilePasswordChange';
import ProfileSubscriptionsContainer from '../containers/ProfileSubscriptionsContainer';
import ProfilePrivacyContainer from '../containers/ProfilePrivacyContainer';
import { PrivateRouteSidebar } from './PrivateRouteSideBar';

export const SidebarRoute = (
<Switch>
    <PrivateRouteSidebar exact path='/profile/:username/edit' component={ProfileEditContainer} />
    <PrivateRouteSidebar exact path='/profile/:username/edit/change-email' component={EmailChange} />
    <PrivateRouteSidebar exact path='/profile/:username/edit/change-password' component={ProfilePasswordChange} />
    <PrivateRouteSidebar exact path='/profile/:username/edit/subscriptions' component={ProfileSubscriptionsContainer} />
    <PrivateRouteSidebar exact path='/profile/:username/edit/privacy' component={ProfilePrivacyContainer} />
</Switch>
);
