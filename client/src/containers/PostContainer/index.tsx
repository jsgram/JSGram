import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import {
    getPostsAsync,
    getMorePostsAsync,
    showPost,
    editPost,
    editDescriptionForPost,
    resetPosts,
    addNextPosts,
} from '../../store/post/actions';
import { deletePhoto, getUser } from '../../store/profile/actions';
import { addLike, checkUserLikeExist, deleteLike, setCountOfLikes } from '../../store/like/actions';

class PostContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <Post
                userPosts={this.props.userPosts}
                user={this.props.user}
                getPostsAsync={this.props.getPostsAsync}
                getMorePostsAsync={this.props.getMorePostsAsync}
                deletePhoto={this.props.deletePhoto}
                addLike={this.props.addLike}
                setCountOfLikes={this.props.setCountOfLikes}
                deleteLike={this.props.deleteLike}
                countOfLikes={this.props.countOfLikes}
                showPost={this.props.showPost}
                likeExist={this.props.likeExist}
                checkUserLikeExist={this.props.checkUserLikeExist}
                editPost={this.props.editPost}
                editDescriptionForPost={this.props.editDescriptionForPost}
                username={this.props.username}
                getUser={this.props.getUser}
                resetPosts={this.props.resetPosts}
                addNextPosts={this.props.addNextPosts}
                loggedUsername={this.props.loggedUsername}
            />
        );
    }
}

const mapStateToProps = (state: any, ownProps: {username: string}): any => ({
    userPosts: state.userPosts,
    user: state.profile.user,
    countOfLikes: state.like.countOfLikes,
    likeExist: state.like.likeExist,
    ownProps: ownProps.username,
    loggedUsername: state.feed.loggedUsername,
});

const mapDispatchToProps = {
    getPostsAsync,
    getMorePostsAsync,
    deletePhoto,
    setCountOfLikes,
    addLike,
    checkUserLikeExist,
    deleteLike,
    showPost,
    editPost,
    editDescriptionForPost,
    getUser,
    resetPosts,
    addNextPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
