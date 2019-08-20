import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TOKEN } from '../store/login/setToken.helper';

export const PublicRoute = ({ component: Component, ...rest }: any): JSX.Element => {
    const routeComponent = (props: any): JSX.Element => (
        localStorage.getItem(TOKEN)
            ? <Redirect to={{ pathname: '/feed' }} />
            : <Component {...props} />
    );
    return <Route {...rest} render={routeComponent} />;
};
