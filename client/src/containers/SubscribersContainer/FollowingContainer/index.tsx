import React from 'react';
import { connect } from 'react-redux';
import { Followings, IFollowingProps } from '../../../components/Subscriber/Followings';
import {
    getFollowing,
    setNextPage,
    getMoreFollowings,
} from '../../../store/subscribers/following/actions';
import { followUser, unfollowUser } from '../../../store/profile/actions';

const FollowingsContainer = (props: IFollowingProps): JSX.Element => {
    return(
        <Followings
            loggedId={props.loggedId}
            urlUsername={props.urlUsername}
            page={props.page}
            allFollowingLoaded={props.allFollowingLoaded}
            following={props.following}
            getFollowing={props.getFollowing}
            setNextPage={props.setNextPage}
            getMoreFollowings={props.getMoreFollowings}
            followUser={props.followUser}
            unfollowUser={props.unfollowUser}
            loadFollow={props.loadFollow}
        />
    );
};

const mapStateToProps = (state: any): any => ({
    loggedId: state.feed.loggedId,
    page: state.following.page,
    loading: state.following.loading,
    allFollowingLoaded: state.following.allFollowingLoaded,
    following: state.following.following,
    loadFollowing: state.profile.loading,
});

const mapDispatchToProps = {
    getFollowing,
    setNextPage,
    getMoreFollowings,
    followUser,
    unfollowUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingsContainer);
