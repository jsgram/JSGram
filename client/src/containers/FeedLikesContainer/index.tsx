import React from 'react';
import { connect } from 'react-redux';
import {
    setFeedAuthorsOfLike,
    setUserLikeExist,
    addLike, deleteLike,
} from '../../store/likes/actions';
import { ILike } from '../../store/likes/reducers';
import { IFeedState } from '../../store/feed/reducers';
import { Likes } from '../../components/Likes';

interface ILikeState {
    feed: IFeedState;
    userPosts: any;
    likes: ILike;
    newsFeed: [];
}

interface ILikeProps {
    postId: string;
    likes: [];
    loggedId: string;
    authorsOfLike: never[];
    newsFeed: [];
}

interface ICommentsState {
    postId: string;
    authorsOfLike: [];
    userLikeExist: boolean;
}

class FeedLikesContainer extends React.Component<any> {
    public state: ICommentsState = {
        postId: '',
        authorsOfLike: [],
        userLikeExist: false,
    };

    public componentDidMount(): void {
        if (!!this.props.postId && this.props.likes) {
            const userLikeExist = this.props.likes.includes(this.props.loggedId);
            this.props.setFeedAuthorsOfLike(this.props.postId, this.props.likes, userLikeExist);
        }
    }

    public componentDidUpdate(prevProps: any): void {
        const userPost = this.props.authorsOfLike.filter(({postId}: { postId: string }) =>
            this.props.postId === postId);

        if (prevProps.authorsOfLike !== this.props.authorsOfLike && userPost.length) {
            const [{postId, authorsOfLike, userLikeExist}]:
                [{postId: string, authorsOfLike: string, userLikeExist: string}] = userPost;
            this.setState({
                postId,
                authorsOfLike,
                userLikeExist,
            });
        }
    }

    public render(): JSX.Element {
        return (
            <Likes
                postId={this.state.postId}
                authorsOfLike={this.state.authorsOfLike}
                loggedUserLikeExist={this.state.userLikeExist}
                userId={this.props.loggedId}
                addLike={this.props.addLike}
                deleteLike={this.props.deleteLike}
            />
        );
    }
}

const mapStateToProps = (state: ILikeState, ownProps: { postId: string, likes: [] }): ILikeProps => ({
    postId: ownProps.postId,
    likes: ownProps.likes,
    loggedId: state.feed.loggedId,
    authorsOfLike: state.likes.feedAuthorsOfLike,
    newsFeed: state.newsFeed,
});

const mapDispatchToProps = {
    setFeedAuthorsOfLike,
    setUserLikeExist,
    addLike,
    deleteLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedLikesContainer);
