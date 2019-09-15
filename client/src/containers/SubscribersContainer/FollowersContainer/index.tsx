import React from 'react';
import { connect } from 'react-redux';
import { Followers, IFollowersProps } from '../../../components/Subscriber/Followers';
import {
    getFollowers,
    setNextPage,
    getMoreFollowers,
    changeUserFollowing,
} from '../../../store/subscribers/followers/actions';
import { followUser, unfollowUser } from '../../../store/profile/actions';

const FollowersContainer = (props: IFollowersProps): JSX.Element => {
    return(
        <Followers
            loggedId={props.loggedId}
            urlUsername={props.urlUsername}
            page={props.page}
            allFollowersLoaded={props.allFollowersLoaded}
            followers={props.followers}
            getFollowers={props.getFollowers}
            loaded={props.loaded}
            loading={props.loading}
            setNextPage={props.setNextPage}
            getMoreFollowers={props.getMoreFollowers}
            changeUserFollowing={props.changeUserFollowing}
            followUser={props.followUser}
            unfollowUser={props.unfollowUser}
            loadFollow={props.loadFollow}
        />
    );
};

const mapStateToProps = (state: any): any => ({
    loggedId: state.feed.loggedId,
    page: state.followers.page,
    loaded: state.followers.loaded,
    loading: state.followers.loading,
    allFollowersLoaded: state.followers.allFollowersLoaded,
    followers: state.followers.followers,
    loadFollow: state.profile.loading,
});

const mapDispatchToProps = {
    getFollowers,
    setNextPage,
    getMoreFollowers,
    changeUserFollowing,
    followUser,
    unfollowUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowersContainer);
