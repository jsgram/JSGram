import React from 'react';
import noAvatar from '../../assets/noAvatar.png';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import {
    getComments,
    addNextCommentsPage,
    getMoreComments,
    resetComments,
} from '../../store/comments/actions';
import { IComment, IComments } from '../../store/comments/reducers';
import { IPost, IPosts } from '../../store/post/reducers';

interface ILocalState {
    comments: IComment[];
    commentsPage: number;
    commentsLoading: boolean;
    allCommentsLoaded: boolean;
    selectedPost: IPost;
}

interface IState {
    comments: ILocalState;
    userPosts: IPosts;
}

interface IOwnCommentsProps {
    getComments: (comments: IComments) => void;
    getMoreComments: (postId: string, page: number) => void;
    addNextCommentsPage: (commentsPage: number) => void;
    resetComments: () => void;
}

export type ICommentsProps = IOwnCommentsProps & ILocalState;

class Comments extends React.Component<ICommentsProps> {
    public componentDidMount(): void {
        this.props.getComments(this.props.selectedPost.comments);
    }

    public componentWillUnmount(): void {
        this.props.resetComments();
    }

    public getMoreComments = (): void => {
        if (!this.props.allCommentsLoaded) {
            this.props.addNextCommentsPage(this.props.commentsPage);
            this.props.getMoreComments(this.props.selectedPost._id, this.props.commentsPage);
        }
    }

    public render(): JSX.Element {
        return (
            <>
                <div className='flex-grow-1 comments border-top position-relative'>
                    <div className='position-absolute h-100'>
                            {
                                this.props.comments.map((comment: any) => (
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

const mapStateToProps = (state: IState): ILocalState => ({
    comments: state.comments.comments,
    commentsPage: state.comments.commentsPage,
    commentsLoading: state.comments.commentsLoading,
    allCommentsLoaded: state.comments.allCommentsLoaded,
    selectedPost: state.userPosts.selectedPost,
});

const mapDispatchToProps = {
    getComments,
    getMoreComments,
    addNextCommentsPage,
    resetComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
