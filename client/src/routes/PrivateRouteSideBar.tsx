import React from 'react';
import { Route, match } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../history';

interface IParams {
    username: string;
}

interface IProps {
    loggedUsername: string;
    match: match<IParams>;
}

export const PrivateRouteSidebar = ({component: Component, ...rest}: any): JSX.Element => {
    class PrivateRouteWithComponent extends React.Component<IProps> {
        public componentDidMount(): void {
            if (this.props.loggedUsername !== this.props.match.params.username) {
                history.push(`/profile/${this.props.match.params.username}`);
            }
        }

        public render(): JSX.Element {
            return (
                <Component {...this.props} urlUsername={this.props.match.params.username}/>
            );
        }
    }

    const mapStateToProps = (state: { feed: {loggedUsername: string} }): { loggedUsername: string } => ({
        loggedUsername: state.feed.loggedUsername,
    });

    const PrivateRouteComponent = connect(mapStateToProps, null)(PrivateRouteWithComponent);

    return <Route {...rest} component={PrivateRouteComponent}/>;
};
