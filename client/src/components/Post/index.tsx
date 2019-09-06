import React from 'react';
import '../../styles/style.scss';
import { Waypoint } from 'react-waypoint';
import { IUserData } from '../Profile';
import { IPost } from '../../store/post/reducers';
import { Modal, ModalHeader, Spinner, Input, FormGroup, Button } from 'reactstrap';
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
        this.props.editDescriptionForPost(event.target.value, this.props.userPosts.selectedPost._id);
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
        const {_id : userId}: any = this.props.user;
        const {_id : postId}: any = this.props.userPosts.selectedPost;
        const body = {userId, postId};
        const index = this.props.userPosts.selectedPost.authorsOfLike.indexOf(body.userId);
        this.props.userPosts.selectedPost.authorsOfLike.splice(index, 1);
        this.props.deleteLike(body);
    }

    public onAddLike = (): void => {
        const {_id : userId}: any = this.props.user;
        const {_id : postId}: any = this.props.userPosts.selectedPost;
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
        const { userPosts, user, likeExist, countOfLikes }: any = this.props;
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
                    { userPosts.loading && <Spinner className='mt-3' color='dark'/>}
                </div>
                <Modal className='profile-post modal-dial modal-lg modal-dialog-centered px-3 py-3'
                       isOpen={this.state.modal}
                       toggle={(): void => this.toggle(userPosts.selectedPost)}>
                    <div className='modal-body p-0'>
                        <div className='container p-0'>
                            <div className='row'>
                                <div className='col-lg-8'>
                                    <ModalHeader className='d-lg-none display-1'
                                                 toggle={(): void => this.toggle(userPosts.selectedPost)}>
                                        <div className='d-flex flex-row'>
                                            <div className='justify-self-start align-self-start'>
                                            <MenuPost
                                                post={userPosts.selectedPost}
                                                toggleEdit={this.toggleEdit}
                                                toggleModal={this.toggle}
                                            />
                                            </div>
                                            <img
                                                src={user.photo || noAvatar}
                                                alt='avatar'
                                                width={32}
                                                height={32}
                                                className='img-fluid rounded-circle mt-2 ml-1'
                                            />
                                            <span className='mt-2 ml-2'>{user.username}</span>
                                        </div>
                                    </ModalHeader>
                                    <img
                                        src={userPosts.selectedPost.imgPath}
                                        className='w-100 img-fluid'
                                        alt='post'/>
                                </div>
                                <div className='col-lg-4'>
                                    <div className='d-lg-none d-block mt-1 mb-2 pl-3'>
                                        {this.setLikesCount() && likeExist ?
                                            <i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike}/>
                                            :
                                            <i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike}/>
                                        }
                                        <span>{countOfLikes} likes</span>
                                    </div>
                                    <div className='description-post'>
                                        <div className='d-lg-none d-block comments pl-3 text-description'>
                                            <img
                                                src={user.photo}
                                                alt='avatar'
                                                width={32}
                                                height={32}
                                                className='img-fluid rounded-circle
                                                                        mt-2 mr-2'
                                            />
                                            <span>{user.username}</span>
                                            <p className='pl-2 justify-self-start align-self-start'>
                                            {userPosts.selectedPost.description}</p>
                                        </div>
                                        <div className='d-none d-lg-block comments'>
                                            <div className='comments ml-lg-0 pl-lg-0 pl-4'>
                                                <div className='d-flex flex-row justify-content-between'>
                                                    <img
                                                        src={user.photo || noAvatar}
                                                        alt='avatar'
                                                        width={32}
                                                        height={32}
                                                        className='img-fluid justify-self-start mt-2 mr-2'
                                                    />
                                                    <span className='mt-2 justify-self-center'>
                                                    {user.username}</span>
                                                    <div className='d-lg-block d-none justify-self-end'>
                                                      <MenuPost
                                                          post={userPosts.selectedPost}
                                                          toggleEdit={this.toggleEdit}
                                                          toggleModal={this.toggle}
                                                      />
                                                    </div>
                                                </div>
                                                <p className='text-description'>
                                                    {userPosts.selectedPost.description}
                                                </p>
                                                <div className='d-lg-block d-none'>
                                                    <hr className='mt-0'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-lg-block d-none mt-1'>
                                        <div className='d-lg-block d-none'>
                                            <hr/>
                                        </div>
                                        {this.setLikesCount() && likeExist ?
                                            <i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike}/>
                                            :
                                            <i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike}/>
                                        }
                                        <span>{countOfLikes} likes</span>
                                    </div>
                                    <div className='d-lg-block d-none'>
                                        <hr/>
                                    </div>
                                    <div className='mt-3 d-flex justify-content-between'>
                                        <textarea
                                            className='add-comment p-0 border-0 ml-lg-0 ml-3'
                                            placeholder='Write your comment...'
                                            autoComplete='off'
                                            rows={3}
                                        >
                                        </textarea>
                                        <button
                                            className='button-comment p-0 border-0 mr-lg-2
                                             mr-3 d-float align-self-start'
                                            type='submit'
                                            disabled>
                                            Add
                                        </button>
                                    </div>
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
