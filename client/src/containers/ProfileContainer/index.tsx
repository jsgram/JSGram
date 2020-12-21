import React from 'react';
import { connect } from 'react-redux';
import Profile, { IProfileProps, IUserData } from '../../components/Profile';
import { getUser, deletePhoto, followUser, unfollowUser, deleteUser } from '../../store/profile/actions';
import { emitNewNotificationSocket } from '../../store/notifications/actions';
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
                loggedUser={props.loggedUser}
                user={props.user}
                loaded={props.loaded}
                loading={props.loading}
                loadFollow={props.loadFollow}
                getUser={props.getUser}
                followUser={props.followUser}
                unfollowUser={props.unfollowUser}
                emitNewNotificationSocket={props.emitNewNotificationSocket}
                deletePhoto={props.deletePhoto}
                resetPosts={props.resetPosts}
                getPostsAsync={props.getPostsAsync}
                deleteUser={props.deleteUser}
            />
        </div>
    );
};

const mapStateToProps = (state: IState):
    { user: IUserData, loaded: boolean, loading: boolean, loadFollow: boolean, loggedUser: IFeedState } => ({
        user: state.profile.user,
        loaded: state.profile.loaded,
        loading: state.profile.loading,
        loadFollow: state.profile.loading,
        loggedUser: state.feed,
    });

const mapDispatchToProps = {
    getUser,
    followUser,
    unfollowUser,
    deletePhoto,
    resetPosts,
    getPostsAsync,
    deleteUser,
    emitNewNotificationSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
