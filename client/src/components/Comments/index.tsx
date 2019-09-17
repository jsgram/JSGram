import React from 'react';
import noAvatar from '../../assets/noAvatar.png';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import {
    FIRST_PAGE,
    getComments,
    resetComments,
    editCommentAsync,
    changeEditStatus,
    changeComment,
} from '../../store/comments/actions';
import { IComment } from '../../store/comments/reducers';
import {IUserData} from '../Profile';

interface ILocalState {
    postId: string;
    comments: IComment[];
    commentsPage: number;
    commentsLoading: boolean;
    allCommentsLoaded: boolean;
    user: IUserData;
}

interface IState {
    comments: ILocalState;
    ownProps: {
        postId: string;
    };
    profile: {
        user: IUserData;
    };
}

interface IOwnCommentsProps {
    getComments: (postId: string, page: number) => void;
    resetComments: () => void;
    editCommentAsync: (comment: string, commentId: string, email: string) => void;
    changeEditStatus: (commentId: string) => void;
    changeComment: (comment: string, commentId: string) => void;
}

export type ICommentsProps = IOwnCommentsProps & ILocalState;

class Comments extends React.Component<ICommentsProps> {
    public componentDidMount(): void {
        if (this.props.postId) {
            this.props.getComments(this.props.postId, FIRST_PAGE);
        }
    }

    public componentWillUnmount(): void {
        this.props.resetComments();
    }

    public getMoreComments = (): void => {
        if (!this.props.allCommentsLoaded && this.props.postId) {
            this.props.getComments(this.props.postId, this.props.commentsPage + 1);
        }
    }

    public editComment = (comment: string, id: string, email: string): void => {
        this.props.editCommentAsync(comment, id, email);
    }

    public renderComment = (comment: IComment): any => (
        comment.isEdit ?
            (
                <>
                         <textarea
                             rows={3}
                             className='form-control'
                             value={comment.newComment || comment.comment}
                             onChange={
                                 (event: React.ChangeEvent<any>)
                                     : void => this.props.changeComment(
                                     event.target.value,
                                     comment._id,
                                 )
                             }
                         />
                    <div className='btn btn-danger mt-2'
                         onClick={(): void => this.editComment(
                             comment.newComment,
                             comment._id,
                             comment.authorId.email,
                         )}
                    >
                        Change
                    </div>
                    <div className='btn btn-danger mt-2 ml-2'
                         onClick={(): void => this.props.changeEditStatus(
                             comment._id,
                         )}
                    >
                        Cancel
                    </div>
                </>
            )
            :
            (
                <>
                    <div className='d-inline-flex mt-3 float-right edit-delete-comment'>
                        <i
                            className='fa fa-pencil mr-2 edit-comment'
                            onClick={(): void => this.props.changeEditStatus(comment._id)}
                        />
                        <i className='fa fa-trash-o delete-comment'/>
                    </div>
                    <p>{comment.comment}</p>
                </>
            )
    )

    public render(): JSX.Element {
        return (
            <>
                <div className='flex-grow-1 comments border-top position-relative'>
                    <div className='position-absolute h-100'>
                        {!!this.props.comments && this.props.comments.map((comment: any) => (
                                <div className='one-comment px-3' key={comment._id}>
                                    <img
                                        src={comment.authorId.photoPath || noAvatar}
                                        alt='avatar'
                                        width={24}
                                        height={24}
                                        className='img-fluid rounded-circle mt-1 mr-1 mb-1'
                                    />
                                    <span className='mt-1'>{comment.authorId.username}</span>
                                    {
                                        this.props.user.email === comment.authorId.email
                                            ? this.renderComment(comment)
                                            : <p>{comment.comment}</p>
                                    }
                                </div>
                            ),
                        )
                        }
                    </div>
                </div>
                <Waypoint
                    scrollableAncestor={window}
                    onEnter={(): void => {
                        this.getMoreComments();
                    }}
                />
            </>
        );
    }
}

const mapStateToProps = (state: IState, ownProps: { postId: string }): ILocalState => ({
    postId: ownProps.postId,
    comments: state.comments.comments,
    commentsPage: state.comments.commentsPage,
    commentsLoading: state.comments.commentsLoading,
    allCommentsLoaded: state.comments.allCommentsLoaded,
    user: state.profile.user,
});

const mapDispatchToProps = {
    getComments,
    resetComments,
    editCommentAsync,
    changeEditStatus,
    changeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
