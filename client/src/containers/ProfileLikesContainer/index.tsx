import React from 'react';
import { connect } from 'react-redux';
import { setAuthorsOfLike, setUserLikeExist, addLike, deleteLike } from '../../store/likes/actions';
import { ILike } from '../../store/likes/reducers';
import { IFeedState } from '../../store/feed/reducers';
import { Likes } from '../../components/Likes';

class ProfileLikesContainer extends React.Component<any> {
    public componentDidMount(): void {
        this.props.setAuthorsOfLike(this.props.userPosts.selectedPost.authorsOfLike);
    }

    public componentDidUpdate(prevProps: any): void {
        if (prevProps.authorsOfLike !== this.props.authorsOfLike) {
            this.props.setUserLikeExist(this.props.authorsOfLike.includes(this.props.loggedId));
        }
    }

    public render(): JSX.Element {
        return (
            <Likes
                userId={this.props.loggedId}
                postId={this.props.userPosts.selectedPost._id}
                authorsOfLike={this.props.authorsOfLike}
                loggedUserLikeExist={this.props.loggedUserLikeExist}
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

const mapStateToProps = (state: ILikeState): ILikeProps => ({
    loggedId: state.feed.loggedId,
    userPosts: state.userPosts,
    authorsOfLike: state.likes.authorsOfLike,
    loggedUserLikeExist: state.likes.loggedUserLikeExist,
});

const mapDispatchToProps = {
    setAuthorsOfLike,
    setUserLikeExist,
    addLike,
    deleteLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLikesContainer);
