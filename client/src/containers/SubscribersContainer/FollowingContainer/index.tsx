import React from 'react';
import { connect } from 'react-redux';
import {
    getFollowing,
    setNextPage,
    getMoreFollowings,
    changeUserFollowing,
} from '../../../store/subscribers/following/actions';
import { followUser, unfollowUser } from '../../../store/profile/actions';
import { Followers } from '../../../components/Subscriber/Followers';

export interface IFollowingProps {
    following: [];
    urlUsername: string;
    page: number;
    loggedId: string;
    allFollowingLoaded: boolean;
    loadFollow: boolean;
    loaded: boolean;
    loading: boolean;
    followUser: (body: { _id: string }) => void;
    unfollowUser: (body: { _id: string }) => void;
    getFollowing: (loggedId: string, urlUsername: string) => void;
    setNextPage: (page: number) => void;
    getMoreFollowings: (loggedId: string, urlUsername: string, page: number) => void;
    changeUserFollowing: (_id: string) => void;
}

const FollowingsContainer = (props: IFollowingProps): JSX.Element => {
    return(
        <Followers
            loggedId={props.loggedId}
            urlUsername={props.urlUsername}
            page={props.page}
            allFollowersLoaded={props.allFollowingLoaded}
            followers={props.following}
            getFollowers={props.getFollowing}
            loaded={props.loaded}
            loading={props.loading}
            setNextPage={props.setNextPage}
            getMoreFollowers={props.getMoreFollowings}
            changeUserFollowing={props.changeUserFollowing}
            followUser={props.followUser}
            unfollowUser={props.unfollowUser}
            loadFollow={props.loadFollow}
        />
    );
};

const mapStateToProps = (state: any): any => ({
    loggedId: state.feed.loggedId,
    page: state.following.page,
    loaded: state.followers.loaded,
    loading: state.following.loading,
    allFollowingLoaded: state.following.allFollowingLoaded,
    following: state.following.following,
    loadFollowing: state.profile.loading,
});

const mapDispatchToProps = {
    getFollowing,
    setNextPage,
    getMoreFollowings,
    changeUserFollowing,
    followUser,
    unfollowUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingsContainer);
