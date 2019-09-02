import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPostsAsync, getMorePostsAsync } from '../../store/post/actions';
import { deletePhoto } from '../../store/profile/actions';
import { addLike, deleteLike } from '../../store/like/actions';

export class PostContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <Post
                userPosts={this.props.userPosts}
                user={this.props.user}
                getPostsAsync={this.props.getPostsAsync}
                getMorePostsAsync={this.props.getMorePostsAsync}
                deletePhoto={this.props.deletePhoto}
                addLike={this.props.addLike}
                deleteLike={this.props.deleteLike}
                countOfLikes={this.props.countOfLikes}
            />
        );
    }
}

const mapStateToProps = (state: any): any => ({
    userPosts: state.userPosts,
    user: state.profile.user,
    countOfLikes: state.profile.countOfLikes,
});

const mapDispatchToProps = {
    getPostsAsync,
    getMorePostsAsync,
    deletePhoto,
    addLike,
    deleteLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
