import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPostsAsync, getMorePostsAsync } from '../../store/post/actions';
import { deletePhoto } from '../../store/profile/actions';

export class PostContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <Post
                userPosts={this.props.userPosts}
                user={this.props.user}
                getPostsAsync={this.props.getPostsAsync}
                getMorePostsAsync={this.props.getMorePostsAsync}
                deletePhoto={this.props.deletePhoto}
            />
        );
    }
}

const mapStateToProps = (state: any): any => ({
    userPosts: state.userPosts,
    user: state.profile.user,
});

const mapDispatchToProps = {
    getPostsAsync,
    getMorePostsAsync,
    deletePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
