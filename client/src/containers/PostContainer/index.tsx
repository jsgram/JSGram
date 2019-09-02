import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPostsAsync, getMorePostsAsync } from '../../store/post/actions';
import { deletePhoto } from '../../store/profile/actions';
import { addLike, deleteLike, addLikeAsync, deleteLikeAsync } from '../../store/like/actions';

export class PostContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <Post
                userPosts={this.props.userPosts}
                user={this.props.user}
                getPostsAsync={this.props.getPostsAsync}
                getMorePostsAsync={this.props.getMorePostsAsync}
                deletePhoto={this.props.deletePhoto}
                count={this.props.count}
                like={this.props.like}
                addLike={this.props.addLike}
                deleteLike={this.props.deleteLike}
                addLikeAsync={this.props.addLikeAsync}
                deleteLikeAsync={this.props.deleteLikeAsync}
            />
        );
    }
}

const mapStateToProps = (state: any): any => ({
    userPosts: state.userPosts,
    user: state.profile.user,
    count: state.like.count,
    like: state.like.like,
});

const mapDispatchToProps = {
    getPostsAsync,
    getMorePostsAsync,
    deletePhoto,
    addLike,
    deleteLike,
    addLikeAsync,
    deleteLikeAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
