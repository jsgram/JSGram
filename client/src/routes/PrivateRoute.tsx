import React from 'react';
import { Route } from 'react-router-dom';
import { getUserInfoFromToken } from '../store/feed/actions';
import { connect } from 'react-redux';

export const PrivateRoute = ({component: Component, ...rest}: any): JSX.Element => {
    class PrivateRouteWithComponent extends React.Component<any> {
        public componentDidMount(): void {
            if (!this.props.username) {
                this.props.getUserInfoFromToken();
            }
        }

        public render(): JSX.Element {
            return (
                <Component {...this.props} urlUsername={this.props.match.params.username}/>
            );
        }
    }

    const mapStateToProps = (state: any): any => ({
        loggedUsername: state.feed.loggedUsername,
    });

    const mapDispatchToProps = {
        getUserInfoFromToken,
    };
    const PrivateRouteComponent = connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWithComponent);

    return <Route {...rest} component={PrivateRouteComponent}/>;
};
