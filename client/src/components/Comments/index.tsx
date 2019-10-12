import React from 'react';
import noAvatar from '../../assets/noAvatar.png';
import { connect } from 'react-redux';
import {
    FIRST_PAGE,
    getComments,
    resetComments,
    deleteComment,
    editCommentAsync,
    changeEditStatus,
    changeComment,
    setDefaultCommentToChange,
} from '../../store/comments/actions';
import { IFeedState } from '../../store/feed/reducers';
import './style.scss';
import { Link } from 'react-router-dom';
import { IAuthor, IComment } from '../../store/comments/reducers';

interface ILocalState {
    postId: string;
    comments: IComment;
    authors: IAuthor;
    allCommentsId: string[];
    commentsPage: any[];
    commentsLoading: boolean;
    allCommentsLoaded: any[];
    feed: IFeedState;
}

interface ICommentInfo {
    _id: string;
    postId: string;
    authorId: string;
    comment: string;
    newComment: string;
    isEdit: boolean;
}

interface IState {
    comments: ILocalState;
    ownProps: {
        postId: string;
    };
    feed: IFeedState;
}

interface IOwnCommentsProps {
    getComments: (commentState: any, commentsLoaded?: boolean) => void;
    resetComments: () => void;
    editCommentAsync: (comment: string, commentId: string) => void;
    changeEditStatus: (commentId: string) => void;
    changeComment: (comment: string, commentId: string) => void;
    deleteComment: (postId: string, authorId: string) => void;
    setDefaultCommentToChange: (postId: string) => void;
}

export type ICommentsProps = IOwnCommentsProps & ILocalState;

export class Comments extends React.Component<ICommentsProps> {
    public componentDidMount(): void {
        if (this.props.postId) {
            this.props.getComments([{postId: this.props.postId, page: FIRST_PAGE}]);
            this.props.setDefaultCommentToChange(this.props.postId);
        }
    }

    public getMoreComments = (): void => {
        const commentStateForCurrentPost =
            this.props.commentsPage.filter((info: { postId: string, page: number }) =>
                info.postId === this.props.postId);

        const commentsLoaded = this.props.allCommentsLoaded.some((post: any) => post === this.props.postId);

        this.props.getComments(commentStateForCurrentPost, commentsLoaded);
    }

    public componentWillUnmount(): void {
        this.props.resetComments();
    }

    public editComment = (comment: string, id: string): void => {
        this.props.editCommentAsync(comment, id);
    }

    public onDeleteComment = (commentId: string, authorId: string): void => {
        this.props.deleteComment(
            commentId, authorId,
        );
    }

    public renderComment = (comment: ICommentInfo): JSX.Element => (
        comment.isEdit ?
            (
                <>
                    <textarea
                        rows={3}
                        className='form-control'
                        value={comment.newComment}
                        onChange={
                            (event: React.ChangeEvent<any>)
                                : void => this.props.changeComment(
                                event.target.value,
                                comment._id,
                            )
                        }
                    />
                    <div className='d-inline float-right edit-delete-comment mt-1'>
                        <i className='fa fa-times fa-lg text-danger mr-2 icon-edit'
                           onClick={(): void => this.props.changeEditStatus(
                               comment._id,
                           )}>
                        </i>
                        <i className='fa fa-check fa-lg text-success icon-edit'
                           onClick={(): void => this.editComment(
                               comment.newComment,
                               comment._id,
                           )}>
                        </i>
                    </div>
                </>
            )
            :
            (
                <>
                    <div className='d-inline float-right edit-delete-comment'>
                        <i
                            className='fa fa-pencil mr-2 edit-comment'
                            onClick={(): void => this.props.changeEditStatus(comment._id)}
                        />
                        <i className='fa fa-trash-o delete-comment' onClick={
                            (): void => this.onDeleteComment(comment._id, comment.authorId)
                        }/>
                    </div>
                    <p>{comment.comment}</p>
                </>
            )
    )

    public renderCommentsTemplate = (commentInfo: ICommentInfo): JSX.Element => {
        const {authorId, comment}: ICommentInfo = commentInfo;
        const {authors, feed: {loggedUsername, isAdmin}}: ICommentsProps = this.props;

        return (
            <div className='one-comment px-3'>
                <div className='d-flex justify-content-between'>
                    <div className='w-100'>
                        <img
                            src={authors[authorId].photoPath || noAvatar}
                            alt='avatar'
                            width={24}
                            height={24}
                            className='img-fluid rounded-circle mt-1 mr-1 mb-1'
                        />
                        <Link to={`/profile/${authors[authorId].username}`}
                              className='text-dark mt-1'
                        >
                            {authors[authorId].username}
                        </Link>
                        {
                            (
                                loggedUsername === authors[authorId].username || isAdmin
                            )
                                ? this.renderComment(commentInfo)
                                :
                                <p>{comment}</p>
                        }
                    </div>
                </div>
            </div>
        );
    }

    public getComments = (): JSX.Element => (
        <div
            className='d-inline float-left get-more-comments'>
            {!this.props.allCommentsLoaded.some((post: any) => post === this.props.postId) &&
            <p
                className='get-comments'
                onClick={this.getMoreComments}
            >
                Get more comments
            </p>
            }
        </div>
    )

    public render(): JSX.Element {
        return (
            <div className='flex-grow-1 comments border-top'>
                {this.props.allCommentsId && this.props.allCommentsId.map((commentId: any) => (
                    <div key={commentId} className='comment'>
                        {
                            this.props.comments[commentId].postId === this.props.postId &&
                            this.renderCommentsTemplate(this.props.comments[commentId])
                        }
                    </div>
                ))}
                {this.getComments()}
            </div>
        );
    }
}

const mapStateToProps = (state: IState, ownProps: { postId: string }): ILocalState => ({
    postId: ownProps.postId,
    comments: state.comments.comments,
    authors: state.comments.authors,
    allCommentsId: state.comments.allCommentsId,
    commentsPage: state.comments.commentsPage,
    commentsLoading: state.comments.commentsLoading,
    allCommentsLoaded: state.comments.allCommentsLoaded,
    feed: state.feed,
});

const mapDispatchToProps = {
    getComments,
    resetComments,
    editCommentAsync,
    changeEditStatus,
    changeComment,
    deleteComment,
    setDefaultCommentToChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
