import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPostsAsync, getMorePostsAsync, showPost, editPost, editDescriptionForPost } from '../../store/post/actions';
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
                showPost={this.props.showPost}
                editPost={this.props.editPost}
                editDescriptionForPost={this.props.editDescriptionForPost}
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
    showPost,
    editPost,
    editDescriptionForPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
