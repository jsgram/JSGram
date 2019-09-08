import React from 'react';
import { connect } from 'react-redux';
import {
    getNewsFeedAsync,
    getMoreNewsFeedAsync,
} from '../../store/newsFeed/actions';
import Post from '../../components/Post';
import { addLike, checkUserLikeExist, deleteLike, setCountOfLikes } from '../../store/like/actions';

export class FeedContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <Post
                userPosts={this.props.userPosts}
                user={this.props.user}
                getNewsFeedAsync={this.props.getPostsAsync}
                getMoreNewsFeedAsync={this.props.getMorePostsAsync}
                addLike={this.props.addLike}
                setCountOfLikes={this.props.setCountOfLikes}
                deleteLike={this.props.deleteLike}
                countOfLikes={this.props.countOfLikes}
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
    getNewsFeedAsync,
    getMoreNewsFeedAsync,
    setCountOfLikes,
    addLike,
    checkUserLikeExist,
    deleteLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
