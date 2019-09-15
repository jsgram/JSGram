import React from 'react';
import noAvatar from '../../assets/noAvatar.png';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import {
    FIRST_PAGE,
    getComments,
    resetComments,
} from '../../store/comments/actions';
import { IComment } from '../../store/comments/reducers';

interface ILocalState {
    postId: string;
    comments: IComment[];
    commentsPage: number;
    commentsLoading: boolean;
    allCommentsLoaded: boolean;
}

interface IState {
    comments: ILocalState;
    ownProps: {
        postId: string;
    };
}

interface IOwnCommentsProps {
    getComments: (postId: string, page: number) => void;
    resetComments: () => void;
}

export type ICommentsProps = IOwnCommentsProps & ILocalState;

class Comments extends React.Component<ICommentsProps> {
    public componentDidMount(): void {
        this.props.getComments(this.props.postId, FIRST_PAGE);
    }

    public componentWillUnmount(): void {
        this.props.resetComments();
    }

    public getMoreComments = (): void => {
        if (!this.props.allCommentsLoaded) {
            this.props.getComments(this.props.postId, this.props.commentsPage + 1);
        }
    }

    public render(): JSX.Element {
        return (
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
                            <div className='d-inline-flex mt-3 float-right edit-delete-comment'>
                                <i className='fa fa-pencil mr-2 edit-comment'/>
                                <i className='fa fa-trash-o delete-comment'/>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                    <Waypoint
                        scrollableAncestor={window}
                        onEnter={(): void => {
                            this.getMoreComments();
                        }}
                    />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
