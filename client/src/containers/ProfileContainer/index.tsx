import React from 'react';
import { connect } from 'react-redux';
import Profile, { IUserData } from '../../components/Profile';
import { getUser, deletePhoto } from '../../store/profile/actions';
import { getUserInfoFromToken } from '../../store/feed/actions';
import { getPostsAsync, resetPosts } from '../../store/post/actions';

interface IStateToPropsProfile {
    user: IUserData;
    loaded: boolean;
    loading: boolean;
}

interface IStateToPropsFeed {
    username: string;
}

interface IState {
    profile: IStateToPropsProfile;
    feed: IStateToPropsFeed;
}

interface IParams {
    username: string;
}

export class ProfileContainer extends React.Component <any> {
    public render(): JSX.Element {
        const {username}: IParams = this.props.match.params;
        return (
            <div className='container'>
                <Profile
                    user={this.props.user}
                    loaded={this.props.loaded}
                    loading={this.props.loading}
                    getUser={this.props.getUser}
                    deletePhoto={this.props.deletePhoto}
                    username={username}
                    resetPosts={this.props.resetPosts}
                    getUserInfoFromToken={this.props.getUserInfoFromToken}
                    loggedUsername={this.props.loggedUsername}
                    getPostsAsync={this.props.getPostsAsync}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState): { user: any, loaded: boolean, loading: boolean, loggedUsername: string } => ({
    user: state.profile.user,
    loaded: state.profile.loaded,
    loading: state.profile.loading,
    loggedUsername: state.feed.username,
});

const mapDispatchToProps = {
    getUser,
    deletePhoto,
    getUserInfoFromToken,
    resetPosts,
    getPostsAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
