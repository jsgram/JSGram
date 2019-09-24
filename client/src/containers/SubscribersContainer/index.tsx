import React from 'react';
import { connect } from 'react-redux';
import { Subscribers, ISubscribersProps } from '../../components/Subscribers';
import { IFeedState } from '../../store/feed/reducers';
import {
    changeUserFollowing,
    getSubscribers,
    setSubscribersCount,
    resetSubscribers,
} from '../../store/subscribers/actions';
import { getUser } from '../../store/profile/actions';
import { IUserData } from '../../components/Profile';

interface ISubscribersState {
    profile: {
        user: IUserData;
    };
    feed: IFeedState;
    subscribers: ISubscribersProps;
}

interface ISubscribersLocalProps {
    loggedId: string;
    user: IUserData;
    page: number;
    loaded: boolean;
    loading: boolean;
    allSubscribersLoaded: boolean;
    subscribers: [];
    followersCount: number;
    followingCount: number;
    loadFollow: boolean;
}

type SubscribersProps = ISubscribersProps & { match: { path: string } };

class SubscribersContainer extends React.Component<SubscribersProps> {
    public render(): JSX.Element {
        return (
                    <Subscribers
                        path={this.props.match.path}
                        loggedId={this.props.loggedId}
                        urlUsername={this.props.urlUsername}
                        user={this.props.user}
                        page={this.props.page}
                        allSubscribersLoaded={this.props.allSubscribersLoaded}
                        subscribers={this.props.subscribers}
                        followersCount={this.props.followersCount}
                        followingCount={this.props.followingCount}
                        loaded={this.props.loaded}
                        loading={this.props.loading}
                        loadFollow={this.props.loadFollow}
                        getUser={this.props.getUser}
                        getSubscribers={this.props.getSubscribers}
                        setSubscribersCount={this.props.setSubscribersCount}
                        resetSubscribers={this.props.resetSubscribers}
                        changeUserFollowing={this.props.changeUserFollowing}
                    />
        );
    }
}

const mapStateToProps = (state: ISubscribersState): ISubscribersLocalProps => ({
    loggedId: state.feed.loggedId,
    user: state.profile.user,
    page: state.subscribers.page,
    loaded: state.subscribers.loaded,
    loading: state.subscribers.loading,
    allSubscribersLoaded: state.subscribers.allSubscribersLoaded,
    subscribers: state.subscribers.subscribers,
    followersCount: state.subscribers.followersCount,
    followingCount: state.subscribers.followingCount,
    loadFollow: state.subscribers.loading,
});

const mapDispatchToProps = {
    getUser,
    getSubscribers,
    setSubscribersCount,
    resetSubscribers,
    changeUserFollowing,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribersContainer);
