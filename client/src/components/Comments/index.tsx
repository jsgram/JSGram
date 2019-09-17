import React from 'react';
import noAvatar from '../../assets/noAvatar.png';
import { connect } from 'react-redux';
import {
    FIRST_PAGE,
    getComments,
    resetComments,
} from '../../store/comments/actions';
import { IComment } from '../../store/comments/reducers';
import { Button } from 'reactstrap';
import { showAlert } from '../../store/alert/actions';

interface ILocalState {
    postId: string;
    comments: IComment[];
    commentsPage: any[];
    commentsLoading: boolean;
    allCommentsLoaded: any[];
}

interface IState {
    comments: ILocalState;
    ownProps: {
        postId: string;
    };
}

interface IOwnCommentsProps {
    getComments: (postId: string, commentState: any, commentsLoaded?: boolean) => void;
    resetComments: () => void;
}

export type ICommentsProps = IOwnCommentsProps & ILocalState;

class Comments extends React.Component<ICommentsProps> {
    public componentDidMount(): void {
        if (this.props.postId) {
            this.props.getComments(this.props.postId, FIRST_PAGE);
        }
    }

    public getMoreComments = (): void => {

        if (this.props.postId) {
            const commentStateForCurrentPost =
                this.props.commentsPage.filter((info: { postId: string, page: number }) =>
                    info.postId === this.props.postId);

            const commentsLoaded = this.props.allCommentsLoaded.some((post: any) => post === this.props.postId);

            this.props.getComments(this.props.postId, commentStateForCurrentPost, commentsLoaded);
        }
    }

    public componentWillUnmount(): void {
        this.props.resetComments();
    }

    public render(): JSX.Element {
        return (
            <div className='flex-grow-1 comments border-top position-relative'>
                <div className='position-absolute h-100 w-100'>
                    {!!this.props.comments && this.props.comments.map((comment: any) => (
                        <div key={comment._id}>
                            {comment.postId === this.props.postId &&
                            <div className='one-comment px-3'>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <img
                                            src={comment.authorId.photoPath || noAvatar}
                                            alt='avatar'
                                            width={24}
                                            height={24}
                                            className='img-fluid rounded-circle mt-1 mr-1 mb-1'
                                        />
                                        <span className='mt-1'>{comment.authorId.username}</span>
                                    </div>
                                    <div className='d-inline align-self-center edit-delete-comment'>
                                        <i className='fa fa-pencil mr-2 edit-comment'/>
                                        <i className='fa fa-trash-o delete-comment'/>
                                    </div>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                            }
                        </div>
                    ))}
                    <Button
                        outline
                        size='sm'
                        onClick={this.getMoreComments}
                    >
                        Get more comments
                    </Button>
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
});

const mapDispatchToProps = {
    getComments,
    resetComments,
    showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
