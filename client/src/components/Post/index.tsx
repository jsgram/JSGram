import React from 'react';
import '../../styles/style.scss';
import { Waypoint } from 'react-waypoint';
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
// @ts-ignore
import hashtag from 'linkifyjs/plugins/hashtag';
// @ts-ignore
import mention from 'linkifyjs/plugins/mention';
import TextareaAutosize from 'react-textarea-autosize';
import { IUserData } from '../Profile';
import { IPost } from '../../store/post/reducers';
import { Modal, ModalHeader, Spinner, Input, FormGroup, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import './style.scss';
import MenuPost from '../MenuPost';
import noAvatar from '../../assets/noAvatar.svg';

hashtag(linkify);
mention(linkify);

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
}

interface IModalState {
    page: number;
    modal: boolean;
    editModal: boolean;
}

export default class Post extends React.Component<IProps> {

    public state: IModalState = {
        page: 1,
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
        this.setState({page: this.state.page + 1});
        if (!this.props.userPosts.loaded) {
            this.props.getMorePostsAsync(this.props.user.username, this.state.page);
        }
    }

    public componentDidMount(): void {
        this.props.getPostsAsync(this.props.user.username);
    }

    public onDeleteLike = (): void => {
        const {_id: userId}: any = this.props.user;
        const {_id: postId}: any = this.props.userPosts.selectedPost;
        const body = {userId, postId};
        const index = this.props.userPosts.selectedPost.authorsOfLike.indexOf(body.userId);
        this.props.userPosts.selectedPost.authorsOfLike.splice(index, 1);
        this.props.deleteLike(body);
    }

    public onAddLike = (): void => {
        const {_id: userId}: any = this.props.user;
        const {_id: postId}: any = this.props.userPosts.selectedPost;
        const body = {userId, postId};
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
        const linkifyOptions = {
            formatHref(href: any, type: any): any {
                switch (type) {
                    case 'hashtag':
                        return `/hashtags/${href.substr(1)}`;
                    case 'mention':
                        return `/profile/${href.substr(1)}`;
                    default:
                        return href;
                }
            },
        };

        const likeButton = this.setLikesCount() && this.props.likeExist ?
            (<i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike}/>) :
            (<i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike}/>);

        return (
            <div className='container justify-content-center'>
                <div className='row mt-5 profile-post'>
                    {
                        this.props.userPosts.posts.map((post: IPost) => (
                                <div key={post._id} className='col-sm-4 text-center pt-4 post-photo'>
                                    <img
                                        src={post.imgPath}
                                        width={293}
                                        height={293}
                                        alt=''
                                        onClick={(): void => this.toggle(post)}
                                        className='img-fluid'
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
                    {this.props.userPosts.loading && <Spinner className='mt-3' color='dark'/>}
                </div>
                <Modal className='profile-post modal-dial modal-lg modal-dialog-centered px-3 py-3'
                       isOpen={this.state.modal}
                       toggle={(): void => this.toggle(this.props.userPosts.selectedPost)}>
                    <div className='modal-body p-0'>
                        <div className='row m-0'>
                            <ModalHeader
                                className='d-lg-none display-1'
                                toggle={(): void => this.toggle(this.props.userPosts.selectedPost)}
                            >
                                <div className='row'>
                                    <MenuPost
                                        post={this.props.userPosts.selectedPost}
                                        toggleEdit={this.toggleEdit}
                                        toggleModal={this.toggle}
                                    />
                                    <img
                                        src={this.props.user.photo || noAvatar}
                                        alt='avatar'
                                        width={32}
                                        height={32}
                                        className='img-fluid rounded-circle mt-2 ml-4'
                                    />
                                    <span className='mt-2 ml-2'>{this.props.user.username}</span>
                                    <span className='d-lg-block d-none'>
                                      <MenuPost
                                          post={this.props.userPosts.selectedPost}
                                          toggleEdit={this.toggleEdit}
                                          toggleModal={this.toggle}
                                      />
                                    </span>
                                </div>
                            </ModalHeader>

                            <div className='col-12 col-lg-8 px-0'>
                                <img
                                    src={this.props.userPosts.selectedPost.imgPath}
                                    className='w-100 img-fluid'
                                    alt='post'
                                />
                            </div>

                            <div className='col-12 col-lg-4 px-0 d-flex flex-column position-relative'>
                                <div className='flex-grow-0 p-3'>
                                    <p>
                                        <img
                                            src={this.props.user.photo}
                                            alt='avatar'
                                            width={32}
                                            height={32}
                                            className='img-fluid rounded-circle mt-2 mr-2'
                                        />
                                        {this.props.user.username}
                                    </p>
                                    <p className='d-lg-none'>
                                        {likeButton}
                                        <span>{this.props.countOfLikes} likes</span>
                                    </p>
                                    <Linkify tagName='p' options={linkifyOptions}>
                                        {this.props.userPosts.selectedPost.description}
                                    </Linkify>
                                </div>

                                <div className='flex-grow-1 comments px-3 text-description'>
                                    {/* HERE WILL BE COMMENTS */}
                                </div>

                                <div className='flex-grow-0'>
                                    <div className='d-none d-lg-block p-3 mb-3 border-top border-bottom'>
                                        {likeButton}
                                        <span>{this.props.countOfLikes} likes</span>
                                    </div>
                                    <InputGroup>
                                        <TextareaAutosize
                                            className='add-comment flex-grow-1 border-0 p-2'
                                            placeholder='Write your comment...'
                                            autoComplete='off'
                                            minRows={2}
                                            maxRows={6}
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
                    toggle={(): void => this.toggleEdit(this.props.userPosts.selectedPost)}>
                    <ModalHeader
                        toggle={(): void => this.toggleEdit(this.props.userPosts.selectedPost)}>
                        Edit Post
                    </ModalHeader>
                    <FormGroup className='text-center m-3 post-photo'>
                        <img
                            src={this.props.userPosts.selectedPost.imgPath}
                            width={293}
                            height={293}
                            id={this.props.userPosts.selectedPost._id}
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
                            value={this.props.userPosts.selectedPost.description}
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
