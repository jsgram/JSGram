import React from 'react';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { onChangeComment, addComment } from '../../store/comments/actions';
import { IComments } from '../../store/comments/reducers';

interface ILocalState {
    loggedId: string;
    postId: string;
    onChangeComments: Array<{ postId: string, comment: string }>;
}

interface IState {
    feed: ILocalState;
    comments: IComments;
}

class WriteComment extends React.Component<any> {
    public onCommentChange = (postId: any, event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.props.onChangeComment(postId, event.target.value);
    }

    public onAddComment = (postId: string, commentValue: string): void => {
        this.props.addComment(
            postId,
            this.props.loggedId,
            commentValue,
        );
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
                            className='add-comment flex-grow-1 border-0 p-2'
                            placeholder='Write your comment...'
                            autoComplete='off'
                            minRows={1}
                            maxRows={4}
                            value={commentInfo[0].comment}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                                this.onCommentChange(this.props.postId, event)}
                        />
                        <InputGroupAddon addonType='append' className='flex-grow-0'>
                            <Button
                                className='btn-block button-comment border-0'
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

const mapStateToProps = (state: IState, ownProps: { postId: string }): ILocalState => ({
    postId: ownProps.postId,
    loggedId: state.feed.loggedId,
    onChangeComments: state.comments.onChangeComments,
});

const mapDispatchToProps = {
    addComment,
    onChangeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteComment);
