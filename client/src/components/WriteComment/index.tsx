import React from 'react';
import './style.scss';
import { Button, InputGroup, InputGroupAddon, DropdownToggle,
         DropdownMenu, Dropdown, DropdownItem, Spinner } from 'reactstrap';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { onChangeComment, addComment } from '../../store/comments/actions';
import { emitNewNotificationSocket } from '../../store/notifications/actions';
import { COMMENT_NOTIFICATION } from '../../store/notifications/notificationsConfig';
import { IComments } from '../../store/comments/reducers';
import { clearSearchResults, getSearchResults, addNextResults } from '../../store/search/actions';
import noAvatar from '../../assets/noAvatar.png';
import { Waypoint } from 'react-waypoint';
import { ISearchState } from '../../store/search/reducers';
import { checkForMentions, onResultClick, getMoreResults } from '../../helpers/mentions.search';

interface IProps {
    loggedId: string;
    loggedUsername: string;
    postId: string;
    authorId: string;
    page: number;
    searchResults: any;
    loaded: boolean;
    loading: boolean;
    onChangeComments: Array<{ postId: string, comment: string }>;
    onChangeComment: (postId: string, event: string) => void;
    addComment: (postId: string, loggedId: string, commentValue: string) => void;
    emitNewNotificationSocket: (userId: string, loggedUsername: string, message: string) => void;
    clearSearchResults: () => void;
    getSearchResults: (query: string, page: number) => void;
    addNextResults: (page: number) => void;
}

interface ILocalState {
    loggedId: string;
    loggedUsername: string;
    postId: string;
    authorId: string;
    onChangeComments: Array<{ postId: string, comment: string }>;
    page: number;
    searchResults: object[];
    loaded: boolean;
    loading: boolean;
}

interface IState {
    feed: ILocalState;
    comments: IComments;
    search: ISearchState;
}

interface IWriteComponentState {
    isModalOpen: boolean;
    searchValue: string;
}

export class WriteComment extends React.Component<IProps> {

    public state: IWriteComponentState = {
        isModalOpen: false,
        searchValue: '',
    };

    public timer: any;

    public componentWillUnmount = (): void => {
        clearTimeout(this.timer);
        this.props.clearSearchResults();
        this.setState({searchValue: ''});
        this.props.onChangeComment(this.props.postId, '');
    }

    public onCommentChange = (postId: string, event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.props.onChangeComment(postId, event.target.value);
        checkForMentions(event.target.value, this);
    }

    public onAddComment = (postId: string, commentValue: string): void => {
        this.props.addComment(
            postId,
            this.props.loggedId,
            commentValue,
        );

        this.props.emitNewNotificationSocket(this.props.authorId, this.props.loggedUsername, COMMENT_NOTIFICATION);
        this.toggle('');
    }

    public toggle = (searchQuery: string): void => {
        this.setState({
            isModalOpen: searchQuery !== '',
        });
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
                            maxLength={200}
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
                <Dropdown className='search-menu w-75' color='light'
                          isOpen={this.state.isModalOpen} inNavbar={true} direction='up'
                          toggle={(): void => {this.toggle(this.state.searchValue); }}>
                    <DropdownToggle tag='a' className='nav-link m-0 p-0'/>
                    <DropdownMenu className='scrollable-menu col-12 mb-5'>
                        {this.props.searchResults.map((user: any) =>
                        <div key={user._id} onClick={(): void => {
                            onResultClick(commentInfo[0].comment, user.username, this.props.onChangeComment, this);
                        }}>
                                <div className='w-100'>
                                <DropdownItem className='p-md-2 p-1 d-flex align-items-center'>
                                    <img
                                        src={user.photoPath || noAvatar}
                                        width={32}
                                        height={32}
                                        className='rounded-circle mr-2'
                                        alt='avatar'
                                    />
                                    <span className='font-weight-bold'>{user.username}<br/>
                                    <span className='font-weight-normal fullname'>{user.fullName}</span></span>
                                </DropdownItem>
                                <DropdownItem divider/>
                            </div>
                        </div>)}
                            <div className='d-flex justify-content-center'>
                                    {this.props.loading && <Spinner color='dark'/>}
                                </div>
                                {!this.props.loaded && !this.props.loading &&
                                <Waypoint
                                    onEnter={(): void => {
                                        getMoreResults(commentInfo[0].comment, this);
                                    }}
                                />}
                    </DropdownMenu>
                </Dropdown>
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
    page: state.search.page,
    searchResults: state.search.searchResults,
    loaded: state.search.loaded,
    loading: state.search.loading,
});

const mapDispatchToProps = {
    addComment,
    onChangeComment,
    emitNewNotificationSocket,
    clearSearchResults,
    getSearchResults,
    addNextResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteComment);
