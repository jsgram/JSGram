import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, auth, ...rest }: any): any => {
    const routeComponent = (props: string): any => (
        auth
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login' }} />
    );
    return <Route {...rest} render={routeComponent} />;
}