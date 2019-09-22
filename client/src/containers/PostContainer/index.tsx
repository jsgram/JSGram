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
    newDescriptionForPost,
    changeEditStatus,
} from '../../store/post/actions';
import { deletePhoto, getUser } from '../../store/profile/actions';

const PostContainer = (props: any): JSX.Element => (
    <Post
        userPosts={props.userPosts}
        user={props.user}
        getPostsAsync={props.getPostsAsync}
        getMorePostsAsync={props.getMorePostsAsync}
        deletePhoto={props.deletePhoto}
        showPost={props.showPost}
        editPost={props.editPost}
        editDescriptionForPost={props.editDescriptionForPost}
        username={props.username}
        getUser={props.getUser}
        resetPosts={props.resetPosts}
        addNextPosts={props.addNextPosts}
        loggedUser={props.loggedUser}
        newDescriptionForPost={props.newDescriptionForPost}
        changeEditStatus={props.changeEditStatus}
    />
);

const mapStateToProps = (state: any, ownProps: { username: string }): any => ({
    loggedUser: state.feed,
    userPosts: state.userPosts,
    user: state.profile.user,
    ownProps: ownProps.username,
});

const mapDispatchToProps = {
    getPostsAsync,
    getMorePostsAsync,
    deletePhoto,
    showPost,
    editPost,
    editDescriptionForPost,
    getUser,
    resetPosts,
    addNextPosts,
    newDescriptionForPost,
    changeEditStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
