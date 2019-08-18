import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, auth, ...rest }: any): any => {
    const routeComponent = (props: any): any => (
        !auth
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/' }} />
    );
    return <Route {...rest} render={routeComponent} />;
}