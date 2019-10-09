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
import { emitNewNotificationSocket } from '../../store/notifications/actions';

interface ILikeState {
    feed: IFeedState;
    userPosts: any;
    likes: ILike;
    newsFeed: [];
}

interface ILikeProps {
    postId: string;
    likes: string[];
    authorId: string;
    loggedId: string;
    loggedUsername: string;
    authorsOfLike: never[];
    loadingLike: boolean;
    newsFeed: [];
}

interface ICommentsState {
    postId: string;
    authorsOfLike: [];
    userLikeExist: boolean;
}

export class FeedLikesContainer extends React.Component<any> {
    public state: ICommentsState = {
        postId: '',
        authorsOfLike: [],
        userLikeExist: false,
    };

    public componentDidMount(): void {
        if (this.props.postId && this.props.likes) {
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
                authorId={this.props.authorId}
                loadingLike={this.props.loadingLike}
                userId={this.props.loggedId}
                loggedUsername={this.props.loggedUsername}
                addLike={this.props.addLike}
                deleteLike={this.props.deleteLike}
                emitNewNotificationSocket={this.props.emitNewNotificationSocket}
            />
        );
    }
}

const mapStateToProps = (state: ILikeState, ownProps: { postId: string, likes: string[], authorId: string }):
    ILikeProps => ({
        postId: ownProps.postId,
        authorId: ownProps.authorId,
        likes: ownProps.likes,
        loggedId: state.feed.loggedId,
        loggedUsername: state.feed.loggedUsername,
        authorsOfLike: state.likes.feedAuthorsOfLike,
        loadingLike: state.likes.loadingLike,
        newsFeed: state.newsFeed,
    });

const mapDispatchToProps = {
    setFeedAuthorsOfLike,
    setUserLikeExist,
    addLike,
    deleteLike,
    emitNewNotificationSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedLikesContainer);
