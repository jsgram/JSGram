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

const PostContainer = (props: any): JSX.Element => (
    <Post
        userPosts={props.userPosts}
        user={props.user}
        getPostsAsync={props.getPostsAsync}
        getMorePostsAsync={props.getMorePostsAsync}
        deletePhoto={props.deletePhoto}
        addLike={props.addLike}
        setCountOfLikes={props.setCountOfLikes}
        deleteLike={props.deleteLike}
        countOfLikes={props.countOfLikes}
        showPost={props.showPost}
        likeExist={props.likeExist}
        checkUserLikeExist={props.checkUserLikeExist}
        editPost={props.editPost}
        editDescriptionForPost={props.editDescriptionForPost}
        username={props.username}
        getUser={props.getUser}
        resetPosts={props.resetPosts}
        addNextPosts={props.addNextPosts}
        loggedUsername={props.loggedUsername}
    />
);

const mapStateToProps = (state: any, ownProps: { username: string }): any => ({
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
