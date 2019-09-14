import React from 'react';
import { connect } from 'react-redux';
import { setAuthorsOfLike, setUserLikeExist, addLike, deleteLike } from '../../store/likes/actions';
import { ILike } from '../../store/likes/reducers';
import { IFeedState } from '../../store/feed/reducers';

class Likes extends React.Component<any> {
    public componentDidMount(): void {
        this.props.setAuthorsOfLike(this.props.userPosts.selectedPost.authorsOfLike);
    }

    public componentDidUpdate(prevProps: any): void {
        if (prevProps.authorsOfLike !== this.props.authorsOfLike) {
            this.props.setUserLikeExist(this.props.authorsOfLike.includes(this.props.loggedId));
        }
    }

    public onAddLike = (): void => {
        const {loggedId: userId, userPosts: {selectedPost: {_id: postId}}}: any = this.props;
        const body = {userId, postId};
        this.props.addLike(body);
    }

    public onDeleteLike = (): void => {
        const {loggedId: userId, userPosts: {selectedPost: {_id: postId}}}: any = this.props;
        const body = {userId, postId};
        this.props.deleteLike(body);
    }

    public render(): JSX.Element {
        const likeButton = this.props.loggedUserLikeExist ?
            (<i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike}/>) :
            (<i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike}/>);
        return (
            <>
                {likeButton}
                <span>{this.props.authorsOfLike.length} likes</span>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
