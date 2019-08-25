import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '../components/Menu';
import ProfileEditContainer from '../containers/ProfileEditContainer/ProfileEditContainer';
import EmailChange from '../components/EmailChange';

export const SidebarRoute = (
<Switch>
    <Route exact path="/profile/edit" component={ProfileEditContainer} />
    <Route path='/profile/edit/change-email' component={EmailChange} />
    <Route path='/profile/edit/change-password' component={Menu} />
</Switch>);