import React from 'react';
import { connect } from 'react-redux';
import Profile, { IProfileProps, IUserData } from '../../components/Profile';
import { getUser, deletePhoto } from '../../store/profile/actions';
import { getPostsAsync, resetPosts } from '../../store/post/actions';

interface IStateToPropsProfile {
    user: IUserData;
    loaded: boolean;
    loading: boolean;
}

interface IState {
    profile: IStateToPropsProfile;
}

export const ProfileContainer = (props: IProfileProps): JSX.Element => {
    return (
        <div className='container'>
            <Profile
                urlUsername={props.urlUsername}
                loggedUsername={props.loggedUsername}
                user={props.user}
                loaded={props.loaded}
                loading={props.loading}
                getUser={props.getUser}
                deletePhoto={props.deletePhoto}
                resetPosts={props.resetPosts}
                getPostsAsync={props.getPostsAsync}
            />
        </div>
    );
};

const mapStateToProps = (state: IState): { user: IUserData, loaded: boolean, loading: boolean } => ({
    user: state.profile.user,
    loaded: state.profile.loaded,
    loading: state.profile.loading,
});

const mapDispatchToProps = {
    getUser,
    deletePhoto,
    resetPosts,
    getPostsAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
