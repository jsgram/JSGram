import React from 'react';
import { Route } from 'react-router-dom';
import { getUserInfoFromToken } from '../store/feed/actions';
import { connect } from 'react-redux';

export const PrivateRoute = ({component: Component, ...rest}: any): any => {
    class HocComponent extends React.Component<any> {
        public componentDidMount(): void {
            if (!this.props.username) {
                this.props.getUserInfoFromToken();
            }
        }

        public render(): JSX.Element {
            return (
                <Component {...this.props} loggedUsername={this.props.username}/>
            );
        }
    }

    const mapStateToProps = (state: any): any => ({
        username: state.feed.username,
    });

    const mapDispatchToProps = {
        getUserInfoFromToken,
    };
    const RouteComponent = connect(mapStateToProps, mapDispatchToProps)(HocComponent);

    return <Route {...rest} component={RouteComponent}/>;
};
