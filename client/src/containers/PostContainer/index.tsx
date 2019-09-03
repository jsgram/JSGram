import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPostsAsync, getMorePostsAsync, showPost } from '../../store/post/actions';
import { deletePhoto } from '../../store/profile/actions';
import { addLike, checkUserLikeExist, deleteLike, setCountOfLikes } from '../../store/like/actions';

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
                setCountOfLikes={this.props.setCountOfLikes}
                deleteLike={this.props.deleteLike}
                countOfLikes={this.props.countOfLikes}
                showPost={this.props.showPost}
                likeExist={this.props.likeExist}
                checkUserLikeExist={this.props.checkUserLikeExist}
            />
        );
    }
}

const mapStateToProps = (state: any): any => ({
    userPosts: state.userPosts,
    user: state.profile.user,
    countOfLikes: state.like.countOfLikes,
    likeExist: state.like.likeExist,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
