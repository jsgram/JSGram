import React from 'react';
import { connect } from 'react-redux';
import { setFeedAuthorsOfLike,
    setUserLikeExist,
    addLike, deleteLike } from '../../store/likes/actions';
import { ILike } from '../../store/likes/reducers';
import { IFeedState } from '../../store/feed/reducers';
import { Likes } from '../../components/Likes';

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
        if (prevProps.authorsOfLike !== this.props.authorsOfLike) {
            // const likeExist = this.props.likes.includes(this.props.loggedId);
            // this.props.setFeedAuthorsOfLike(this.props.postId, this.props.likes, likeExist);

            this.props.authorsOfLike.forEach(({postId, authorsOfLike, userLikeExist}: ICommentsState) => {
                if (this.props.postId === postId) {
                    this.setState({
                        postId,
                        authorsOfLike,
                        userLikeExist,
                    });
                }
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

interface ILikeState {
    feed: IFeedState;
    userPosts: any;
    likes: ILike;
}

interface ILikeProps {
    loggedId: string;
    userPosts: [];
    authorsOfLike: never[];
    loggedUserLikeExist: boolean;
}

const mapStateToProps = (state: any, ownProps: { postId: string, likes: [] }): any => ({
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
