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
} from '../../store/comments/actions';
import { IComment } from '../../store/comments/reducers';
import { IFeedState } from '../../store/feed/reducers';
import './style.scss';

interface ILocalState {
    postId: string;
    comments: IComment[];
    commentsPage: any[];
    commentsLoading: boolean;
    allCommentsLoaded: any[];
    feed: IFeedState;
}

interface IState {
    comments: ILocalState;
    ownProps: {
        postId: string;
    };
    feed: IFeedState;
}

interface IOwnCommentsProps {
    getComments: (postId: string, commentState: any, commentsLoaded?: boolean) => void;
    resetComments: () => void;
    editCommentAsync: (comment: string, commentId: string, email: string) => void;
    changeEditStatus: (commentId: string) => void;
    changeComment: (comment: string, commentId: string) => void;
    deleteComment: (postId: string, authorId: string) => void;
}

export type ICommentsProps = IOwnCommentsProps & ILocalState;

class Comments extends React.Component<ICommentsProps> {
    public componentDidMount(): void {
        if (this.props.postId) {
            this.props.getComments(this.props.postId, FIRST_PAGE);
        }
    }

    public getMoreComments = (): void => {
        const commentStateForCurrentPost =
            this.props.commentsPage.filter((info: { postId: string, page: number }) =>
                info.postId === this.props.postId);

        const commentsLoaded = this.props.allCommentsLoaded.some((post: any) => post === this.props.postId);

        this.props.getComments(this.props.postId, commentStateForCurrentPost, commentsLoaded);
    }

    public componentWillUnmount(): void {
        this.props.resetComments();
    }

    public editComment = (comment: string, id: string, email: string): void => {
        this.props.editCommentAsync(comment, id, email);
    }

    public onDeleteComment = (commentId: string, authorId: string): void => {
        this.props.deleteComment(
            commentId, authorId,
        );
    }

    public renderComment = (comment: IComment): any => (
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
                    <div className='d-flex justify-content-between mt-1'>
                        <i className='fa fa-times-circle text-danger icon-edit'
                            onClick={(): void => this.props.changeEditStatus(
                                comment._id,
                            )}>
                        </i>
                        <i className='fa fa-check-circle text-success icon-edit'
                            onClick={(): void => this.editComment(
                                comment.newComment,
                                comment._id,
                                comment.authorId.email,
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
                            (): void => this.onDeleteComment(comment._id, comment.authorId._id)
                        }/>
                    </div>
                    <p>{comment.comment}</p>
                </>
            )
    )

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
            <div className='flex-grow-1 comments border-top position-relative'>
                <div className='position-absolute h-100 w-100'>
                    {this.props.comments && this.props.comments.map((comment: any) => (
                        <div key={comment._id}>
                            {comment.postId === this.props.postId &&
                            <div className='one-comment px-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='w-100'>
                                        <img
                                            src={comment.authorId.photoPath || noAvatar}
                                            alt='avatar'
                                            width={24}
                                            height={24}
                                            className='img-fluid rounded-circle mt-1 mr-1 mb-1'
                                        />
                                        <span className='mt-1'>{comment.authorId.username}</span>
                                        {
                                            this.props.feed.loggedUsername === comment.authorId.username
                                                ? this.renderComment(comment)
                                                : <p>{comment.comment}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    ))}
                    {this.getComments()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState, ownProps: { postId: string }): ILocalState => ({
    postId: ownProps.postId,
    comments: state.comments.comments,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
