import React from 'react';
import { connect } from 'react-redux';
import { setPostAuthorsOfLike, setUserLikeExist, addLike, deleteLike } from '../../store/likes/actions';
import { ILike } from '../../store/likes/reducers';
import { IFeedState } from '../../store/feed/reducers';
import { Likes } from '../../components/Likes';

interface ILikeState {
    feed: IFeedState;
    likes: ILike;
    userPosts: any;
}

interface ILikeProps {
    loggedId: never | string;
    userPosts: any;
    authorsOfLike: any;
    loggedUserLikeExist: boolean;
}

interface ILocalProps {
    setPostAuthorsOfLike: any;
    setUserLikeExist: any;
    addLike: any;
    deleteLike: any;
}

type IProfileLikesProps = ILikeProps & ILocalProps;

class ProfileLikesContainer extends React.Component<IProfileLikesProps> {
    public componentDidMount(): void {
        this.props.setPostAuthorsOfLike(this.props.userPosts.selectedPost.authorsOfLike);
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
                postId={this.props.userPosts.selectedPost._id}
                authorsOfLike={this.props.authorsOfLike}
                loggedUserLikeExist={this.props.loggedUserLikeExist}
                addLike={this.props.addLike}
                deleteLike={this.props.deleteLike}
            />
        );
    }
}

const mapStateToProps = (state: ILikeState): ILikeProps => ({
    loggedId: state.feed.loggedId,
    userPosts: state.userPosts,
    authorsOfLike: state.likes.postAuthorsOfLike,
    loggedUserLikeExist: state.likes.loggedUserLikeExist,
});

const mapDispatchToProps = {
    setPostAuthorsOfLike,
    setUserLikeExist,
    addLike,
    deleteLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLikesContainer);
