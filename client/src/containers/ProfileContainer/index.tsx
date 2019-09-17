import React from 'react';
import { connect } from 'react-redux';
import Profile, { IProfileProps, IUserData } from '../../components/Profile';
import { getUser, deletePhoto, followUser, unfollowUser } from '../../store/profile/actions';
import { getPostsAsync, resetPosts } from '../../store/post/actions';
import { IFeedState } from '../../store/feed/reducers';

interface IStateToPropsProfile {
    user: IUserData;
    loaded: boolean;
    loading: boolean;
}

interface IState {
    profile: IStateToPropsProfile;
    feed: IFeedState;
}

export const ProfileContainer = (props: IProfileProps): JSX.Element => {
    return (
        <div className='container'>
            <Profile
                urlUsername={props.urlUsername}
                loggedId={props.loggedId}
                loggedUsername={props.loggedUsername}
                user={props.user}
                loaded={props.loaded}
                loading={props.loading}
                loadFollow={props.loadFollow}
                getUser={props.getUser}
                followUser={props.followUser}
                unfollowUser={props.unfollowUser}
                deletePhoto={props.deletePhoto}
                resetPosts={props.resetPosts}
                getPostsAsync={props.getPostsAsync}
            />
        </div>
    );
};

const mapStateToProps = (state: IState):
    { user: IUserData, loaded: boolean, loading: boolean, loadFollow: boolean, feed: IFeedState } => ({
        user: state.profile.user,
        loaded: state.profile.loaded,
        loading: state.profile.loading,
        loadFollow: state.profile.loading,
        feed: state.feed,
    });

const mapDispatchToProps = {
    getUser,
    followUser,
    unfollowUser,
    deletePhoto,
    resetPosts,
    getPostsAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
