import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileEditContainer from '../containers/ProfileEditContainer';
import EmailChange from '../components/EmailChange';
import ProfilePasswordChange from '../components/ProfilePasswordChange';

export const SidebarRoute = (
<Switch>
    <Route exact path="/profile/edit" component={ProfileEditContainer} />
    <Route path='/profile/edit/change-email' component={EmailChange} />
    <Route path='/profile/edit/change-password' component={ProfilePasswordChange} />
</Switch>);