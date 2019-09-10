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
    addLike,
    checkUserLikeExist,
    deleteLike,
    setCountOfLikes, addLoggedUserLike, removeLoggedUserLike,
} from '../../store/post/actions';
import { deletePhoto, getUser } from '../../store/profile/actions';

const PostContainer = (props: any): JSX.Element => (
    <Post
        userPosts={props.userPosts}
        user={props.user}
        getPostsAsync={props.getPostsAsync}
        getMorePostsAsync={props.getMorePostsAsync}
        deletePhoto={props.deletePhoto}
        addLike={props.addLike}
        addLoggedUserLike={props.addLoggedUserLike}
        setCountOfLikes={props.setCountOfLikes}
        deleteLike={props.deleteLike}
        removeLoggedUserLike={props.removeLoggedUserLike}
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
        loggedId={props.loggedId}
        loggedUsername={props.loggedUsername}
    />
);

const mapStateToProps = (state: any, ownProps: { username: string }): any => ({
    userPosts: state.userPosts,
    user: state.profile.user,
    countOfLikes: state.userPosts.countOfLikes,
    likeExist: state.userPosts.likeExist,
    ownProps: ownProps.username,
    loggedId: state.feed.loggedId,
    loggedUsername: state.feed.loggedUsername,
});

const mapDispatchToProps = {
    getPostsAsync,
    getMorePostsAsync,
    deletePhoto,
    setCountOfLikes,
    addLike,
    addLoggedUserLike,
    checkUserLikeExist,
    deleteLike,
    removeLoggedUserLike,
    showPost,
    editPost,
    editDescriptionForPost,
    getUser,
    resetPosts,
    addNextPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
