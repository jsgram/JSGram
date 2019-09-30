import React from 'react';
import { connect } from 'react-redux';
import { setPostAuthorsOfLike, setUserLikeExist, addLike, deleteLike, getLikes } from '../../store/likes/actions';
import { ILike } from '../../store/likes/reducers';
import { IFeedState } from '../../store/feed/reducers';
import { Likes } from '../../components/Likes';
import { emitNewNotificationSocket } from '../../store/notifications/actions';

interface IBody {
    userId: string;
    postId: string;
}

interface ILikeState {
    feed: IFeedState;
    likes: ILike;
    userPosts: any;
}

interface ILikeProps {
    postId: string;
    authorId: string;
    loggedId: never | string;
    loggedUsername: string;
    userPosts: any;
    authorsOfLike: any;
    loadingLike: boolean;
    loggedUserLikeExist: boolean;
}

interface ILocalProps {
    getLikes: (postID: string) => void;
    setUserLikeExist: (loggedUserLikeExist: boolean) => void;
    addLike: (body: IBody) => void;
    deleteLike: (body: IBody) => void;
    emitNewNotificationSocket: (userId: string, loggedUsername: string, message: string) => void;
}

type IProfileLikesProps = ILikeProps & ILocalProps;

class ProfileLikesContainer extends React.Component<IProfileLikesProps> {
    public componentDidMount(): void {
        this.props.getLikes(this.props.postId);
    }

    public componentDidUpdate(prevProps: IProfileLikesProps): void {
        if (prevProps.authorsOfLike !== this.props.authorsOfLike) {
            this.props.setUserLikeExist(this.props.authorsOfLike.includes(this.props.loggedId));
        }
    }

    public render(): JSX.Element {
        return (
            <Likes
                userId={this.props.loggedId}
                authorId={this.props.authorId}
                loggedUsername={this.props.loggedUsername}
                postId={this.props.userPosts.selectedPost._id}
                authorsOfLike={this.props.authorsOfLike}
                loadingLike={this.props.loadingLike}
                loggedUserLikeExist={this.props.loggedUserLikeExist}
                addLike={this.props.addLike}
                deleteLike={this.props.deleteLike}
                emitNewNotificationSocket={this.props.emitNewNotificationSocket}
            />
        );
    }
}

const mapStateToProps = (state: ILikeState, ownProps: {postId: string, authorId: string}): ILikeProps => ({
    postId: ownProps.postId,
    authorId: ownProps.authorId,
    loggedId: state.feed.loggedId,
    loggedUsername: state.feed.loggedUsername,
    userPosts: state.userPosts,
    authorsOfLike: state.likes.postAuthorsOfLike,
    loadingLike: state.likes.loadingLike,
    loggedUserLikeExist: state.likes.loggedUserLikeExist,
});

const mapDispatchToProps = {
    getLikes,
    setPostAuthorsOfLike,
    setUserLikeExist,
    addLike,
    deleteLike,
    emitNewNotificationSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLikesContainer);
