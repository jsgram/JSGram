import React from 'react';
import { Route } from 'react-router-dom';
import { getUserInfoFromToken } from '../store/feed/actions';
import { connect } from 'react-redux';
import { joinRoomNotificationSocket, onNewNotificationSocket } from '../store/notifications/actions';

export const PrivateRoute = ({component: Component, ...rest}: any): JSX.Element => {
    class PrivateRouteWithComponent extends React.Component<any> {
        public componentDidMount(): void {
            if (!this.props.loggedId || !this.props.loggedUsername) {
                this.props.getUserInfoFromToken();
            }

            this.props.onNewNotificationSocket();
        }

        public componentDidUpdate(prevProps: any): void {
            if (prevProps.loggedId !== this.props.loggedId) {
                this.props.joinRoomNotificationSocket(this.props.loggedId);
            }
        }

        public render(): JSX.Element {
            return (
                <Component {...this.props} urlUsername={this.props.match.params.username}/>
            );
        }
    }

    const mapStateToProps = (state: any): any => ({
        loggedId: state.feed.loggedId,
        loggedUsername: state.feed.loggedUsername,
    });

    const mapDispatchToProps = {
        getUserInfoFromToken,
        joinRoomNotificationSocket,
        onNewNotificationSocket,
    };
    const PrivateRouteComponent = connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWithComponent);

    return <Route {...rest} component={PrivateRouteComponent}/>;
};
