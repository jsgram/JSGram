import React from 'react';
import '../../styles/style.scss';
import { Waypoint } from 'react-waypoint';
import TextareaAutosize from 'react-textarea-autosize';
import { IUserData } from '../Profile';
import { IPost } from '../../store/post/reducers';
import { Modal, ModalHeader, Spinner, Input, FormGroup, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import './style.scss';
import MenuPost from '../MenuPost';
import noAvatar from '../../assets/noAvatar.svg';

interface IBody {
    userId: string;
    postId: string;
}

interface IProps {
    userPosts: any;
    user: IUserData;
    editDescriptionForPost: any;
    getPostsAsync: (username: string) => void;
    getMorePostsAsync: (username: string, page: number) => void;
    deletePhoto: () => void;
    addLike: (body: IBody) => void;
    setCountOfLikes: (countOfLikes: number) => void;
    deleteLike: (body: IBody) => void;
    countOfLikes: number;
    editPost: (description: string, id: string) => void;
    showPost: (post: any) => void;
    likeExist: boolean;
    checkUserLikeExist: (doesExist: boolean) => void;
    username: string;
    getUser: (username: string) => void;
    resetPosts: () => void;
    addNextPosts: (pageNumber: number) => void;
    loggedUsername: string;
}

interface IModalState {
    modal: boolean;
    editModal: boolean;
}

export default class Post extends React.Component<IProps> {

    public state: IModalState = {
        modal: false,
        editModal: false,
    };

    public toggle = (post: any): any => {
        this.setState({
            modal: !this.state.modal,
        });
        this.props.showPost(post);
    }

    public toggleEdit = (post: any): any => {
        this.setState({
            editModal: !this.state.editModal,
            modal: !this.state.modal,
        });
        this.props.showPost(post);
    }

    public onEditPost = (): void => {
        this.props.editPost(this.props.userPosts.selectedPost.description, this.props.userPosts.selectedPost._id);
        this.toggleEdit(this.props.userPosts.selectedPost);
    }

    public onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.editDescriptionForPost(event.target.value);
    }

    public getMorePosts = (): void => {
        if (!this.props.userPosts.loaded) {
            this.props.addNextPosts(this.props.userPosts.page + 1);
            this.props.getMorePostsAsync(this.props.user.username, this.props.userPosts.page);
        }
    }

    public componentDidMount(): void {
        this.setState({page: 1});
        this.props.getPostsAsync(this.props.user.username);
    }

    public onDeleteLike = (): void => {
        const {
            user: {_id: userId},
            userPosts: {selectedPost: {_id: postId}},
        }: any = this.props;
        const body = {userId, postId};
        // TODO CAN NOT CHANGE PROPS DIRECTLY
        const index = this.props.userPosts.selectedPost.authorsOfLike.indexOf(body.userId);
        this.props.userPosts.selectedPost.authorsOfLike.splice(index, 1);
        this.props.deleteLike(body);
    }

    public onAddLike = (): void => {
        const {
            user: {_id: userId},
            userPosts: {selectedPost: {_id: postId}},
        }: any = this.props;
        const body = {userId, postId};
        // TODO CAN NOT CHANGE PROPS DIRECTLY
        this.props.userPosts.selectedPost.authorsOfLike.push(this.props.user._id);
        this.props.addLike(body);
    }

    // TODO refactoring in next sprint
    public setLikesCount = (): boolean | void => {
        if (!!this.props.userPosts.selectedPost.authorsOfLike) {
            this.props.setCountOfLikes(this.props.userPosts.selectedPost.authorsOfLike.length);

            const arr = this.props.userPosts.selectedPost.authorsOfLike.filter((userId: string) =>
                this.props.user._id === userId,
            );

            if (arr.length) {
                this.props.checkUserLikeExist(true);
                return true;
            }
            this.props.checkUserLikeExist(false);
            return false;
        }
    }

    public render(): JSX.Element {
        const { userPosts, user, likeExist, countOfLikes }: any = this.props;
        const { selectedPost: { description: desc } }: any = userPosts;

        const HASH_REGEXP = /[#][a-z]+/;
        const MENTION_REGEXP = /[@][a-z]+/;
        const LINK_REGEXP = /(?:(?:https?|ftp):\/\/|www\.)[^\s\/$.?#].[^\s]*/;

        const hashtagRegex = new RegExp(`(${HASH_REGEXP.source}|${MENTION_REGEXP.source}|${LINK_REGEXP.source})`, 'ig');
        const formatDescription = desc && desc.split(hashtagRegex).map((token: string) => {
            switch (true) {
                case !!token.match(HASH_REGEXP):
                    return (<a href={`/profile/${token.slice(1)}`}>{token}</a>);
                case !!token.match(MENTION_REGEXP):
                    return (<a href={`/profile/${token.slice(1)}`}>{token}</a>);
                case !!token.match(LINK_REGEXP):
                    return (<a href={token}>{token}</a>);
                default:
                    return token;
            }
        });

        const likeButton = this.setLikesCount() && likeExist ?
            (<i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike}/>) :
            (<i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike}/>);

        return (
            <div className='container justify-content-center'>
                <div className='row mt-5 profile-post'>
                    {
                        userPosts.posts.map((post: IPost) => (
                                <div key={post._id} className='col-sm-4 text-center pt-4 post-photo'>
                                    <img
                                        src={post.imgPath}
                                        width={293}
                                        height={293}
                                        alt=''
                                        onClick={(): void => this.toggle(post)}
                                        className='img-fluid one-profile-photo'
                                    />
                                </div>
                            ),
                        )
                    }
                    <Waypoint
                        scrollableAncestor={window}
                        onEnter={(): void => {
                            this.getMorePosts();
                        }}
                    />
                </div>
                <div className='w-100 d-flex align-items-center justify-content-center'>
                    { userPosts.loading && <Spinner className='mt-3' color='dark'/>}
                </div>
                <Modal className='profile-post modal-lg modal-dialog-centered px-3 py-3'
                       isOpen={this.state.modal}
                       toggle={(): void => this.toggle(userPosts.selectedPost)}>
                    <div className='modal-body p-0'>
                        <div className='row m-0'>
                            <ModalHeader
                                className='d-lg-none w-100 display-1'
                                toggle={(): void => this.toggle(userPosts.selectedPost)}
                            >
                                <div className='d-flex'>
                                    <MenuPost
                                        post={userPosts.selectedPost}
                                        toggleEdit={this.toggleEdit}
                                        toggleModal={this.toggle}
                                    />
                                    <img
                                        src={user.photo || noAvatar}
                                        alt='avatar'
                                        width={32}
                                        height={32}
                                        className='img-fluid rounded-circle mt-2 ml-4'
                                    />
                                    <span className='mt-2 ml-2'>{user.username}</span>
                                </div>
                            </ModalHeader>

                            <div className='col-12 col-lg-8 px-0'>
                                <img
                                    src={userPosts.selectedPost.imgPath}
                                    className='w-100 img-fluid'
                                    alt='post'
                                />
                            </div>

                            <div className='col-12 col-lg-4 px-0 d-flex flex-column position-relative'>
                                <div className='flex-grow-0 p-3 text-description'>
                                    <div className='d-lg-block d-none flex-row'>
                                        <img
                                            src={user.photo || noAvatar}
                                            alt='avatar'
                                            width={32}
                                            height={32}
                                            className='img-fluid rounded-circle mt-2 mr-2 mb-2'
                                        />
                                        <span className='mt-2 font-weight-bolder'>{user.username}</span>
                                        <div className='d-lg-block d-none float-right'>
                                            <MenuPost
                                                post={userPosts.selectedPost}
                                                toggleEdit={this.toggleEdit}
                                                toggleModal={this.toggle}
                                            />
                                        </div>
                                    </div>
                                    <p className='d-lg-none'>
                                        {likeButton}
                                        <span>{countOfLikes} likes</span>
                                    </p>
                                    <p>{formatDescription}</p>
                                </div>

                                <div className='flex-grow-1 comments px-3 text-description'>
                                    {/* HERE WILL BE COMMENTS */}
                                </div>

                                <div className='flex-grow-0'>
                                    <div className='d-none d-lg-block p-3 mb-3 border-top border-bottom'>
                                        {likeButton}
                                        <span>{countOfLikes} likes</span>
                                    </div>
                                    <InputGroup>
                                        <TextareaAutosize
                                            className='add-comment flex-grow-1 border-0 p-2'
                                            placeholder='Write your comment...'
                                            autoComplete='off'
                                            minRows={1}
                                            maxRows={4}
                                        />
                                        <InputGroupAddon addonType='append' className='flex-grow-0'>
                                            <Button
                                                className='btn-block button-comment border-0'
                                                type='submit'
                                                disabled
                                            >
                                                Add
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={this.state.editModal}
                    toggle={(): void => this.toggleEdit(userPosts.selectedPost)}>
                    <ModalHeader
                        toggle={(): void => this.toggleEdit(userPosts.selectedPost)}>
                        Edit Post
                    </ModalHeader>
                    <FormGroup className='text-center m-3 post-photo'>
                        <img
                            src={userPosts.selectedPost.imgPath}
                            width={293}
                            height={293}
                            id={userPosts.selectedPost._id}
                            alt='post'
                            className='img-fluid w-100'
                        />
                    </FormGroup>
                    <FormGroup className='m-3 change-description'>
                        <Input
                            type='textarea'
                            name='description'
                            placeholder='Write a caption...'
                            spellCheck={false}
                            value={userPosts.selectedPost.description}
                            onChange={this.onDescriptionChange}
                        />
                        <Button
                            color='danger'
                            className='mt-2'
                            block
                            onClick={this.onEditPost}>
                            Update Post
                        </Button>
                    </FormGroup>
                </Modal>
            </div>
        );
    }
}
