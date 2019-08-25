import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '../components/Menu';
import ProfileContainer from '../containers/ProfileContainer';

export const SidebarRoute = (
<Switch>
    <Route exact path="/profile/edit" component={Menu} />
    <Route path='/profile/edit/change-email' component={ProfileContainer} />
    <Route path='/profile/edit/change-password' component={Menu} />
</Switch>);