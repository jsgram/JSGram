import React from 'react';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { onChangeComment, addComment } from '../../store/comments/actions';
import { emitNewNotificationSocket } from '../../store/notifications/actions';
import { COMMENT_NOTIFICATION } from '../../store/notifications/notificationsConfig';
import { IComments } from '../../store/comments/reducers';

interface IProps {
    loggedId: string;
    loggedUsername: string;
    postId: string;
    authorId: string;
    onChangeComments: Array<{ postId: string, comment: string }>;
    onChangeComment: (postId: string, event: string) => void;
    addComment: (postId: string, loggedId: string, commentValue: string) => void;
    emitNewNotificationSocket: (userId: string, loggedUsername: string, message: string) => void;
}

interface ILocalState {
    loggedId: string;
    loggedUsername: string;
    postId: string;
    authorId: string;
    onChangeComments: Array<{ postId: string, comment: string }>;
}

interface IState {
    feed: ILocalState;
    comments: IComments;
}

export class WriteComment extends React.Component<IProps> {
    public onCommentChange = (postId: string, event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.props.onChangeComment(postId, event.target.value);
    }

    public onAddComment = (postId: string, commentValue: string): void => {
        this.props.addComment(
            postId,
            this.props.loggedId,
            commentValue,
        );

        this.props.emitNewNotificationSocket(this.props.authorId, this.props.loggedUsername, COMMENT_NOTIFICATION);
    }

    public render(): JSX.Element {
        const commentInfo =
            this.props.onChangeComments.filter((info: { postId: string }) =>
                this.props.postId === info.postId);

        return (
            <div>
                {!!commentInfo.length && commentInfo[0] &&
                    <InputGroup>
                        <TextareaAutosize
                            className='add-comment flex-grow-1 border-0 p-2 interaction'
                            placeholder='Write your comment...'
                            autoComplete='off'
                            minRows={1}
                            maxRows={4}
                            maxLength={200}
                            value={commentInfo[0].comment}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                                this.onCommentChange(this.props.postId, event)}
                        />
                        <InputGroupAddon addonType='append' className='flex-grow-0'>
                            <Button
                                className='btn-block button-comment border-0 interaction'
                                type='submit'
                                onClick={(): void => this.onAddComment(this.props.postId, commentInfo[0].comment)}
                                disabled={!commentInfo[0].comment}
                            >
                                Add
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IState, ownProps: {postId: string; authorId: any}): ILocalState => ({
    postId: ownProps.postId,
    authorId: ownProps.authorId,
    loggedId: state.feed.loggedId,
    loggedUsername: state.feed.loggedUsername,
    onChangeComments: state.comments.onChangeComments,
});

const mapDispatchToProps = {
    addComment,
    onChangeComment,
    emitNewNotificationSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteComment);
