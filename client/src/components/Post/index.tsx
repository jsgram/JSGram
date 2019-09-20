import React from 'react';
import '../../styles/style.scss';
import { Waypoint } from 'react-waypoint';
import { IUserData } from '../Profile';
import { Modal, ModalHeader, Spinner, Input, FormGroup, Button } from 'reactstrap';
import './style.scss';
import MenuPost from '../MenuPost';
import { formatDescription } from '../../helpers/regex.description';
import noAvatar from '../../assets/noAvatar.png';
import ProfileLikes from '../../containers/ProfileLikesContainer';
import { IPost } from '../../store/post/reducers';
import Comments from '../Comments';
import WriteComment from '../WriteComment';

interface IProps {
    userPosts: any;
    user: IUserData;
    editDescriptionForPost: any;
    newDescriptionForPost: any;
    getPostsAsync: (username: string) => void;
    getMorePostsAsync: (username: string, page: number) => void;
    deletePhoto: () => void;
    editPost: (description: string, id: string) => void;
    showPost: (post: any) => void;
    username: string;
    getUser: (username: string) => void;
    resetPosts: () => void;
    addNextPosts: (pageNumber: number) => void;
    loggedId: string;
    loggedUsername: string;
    changeEditStatus: (postId: string) => void;
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
        this.props.changeEditStatus(this.props.userPosts.selectedPost._id);
    }

    public onEditPost = (): void => {
        this.props.editPost(this.props.userPosts.selectedPost.newDescription, this.props.userPosts.selectedPost._id);
        this.toggleEdit(this.props.userPosts.selectedPost);
    }

    public onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.newDescriptionForPost(event.target.value, this.props.userPosts.selectedPost._id);
    }

    public getMorePosts = (): void => {
        if (!this.props.userPosts.loaded) {
            this.props.addNextPosts(this.props.userPosts.page + 1);
            this.props.getMorePostsAsync(this.props.user.username, this.props.userPosts.page);
        }
    }

    public componentDidMount(): void {
        this.props.getPostsAsync(this.props.user.username);
    }

    public render(): JSX.Element {
        const { userPosts, user,
        }: any = this.props;
        const { selectedPost: { description: desc } }: any = userPosts;
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
                    {userPosts.loading && <Spinner className='mt-3' color='dark' />}
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
                                    {
                                        userPosts.selectedPost.author === this.props.loggedId &&
                                        (
                                            <MenuPost
                                                post={userPosts.selectedPost}
                                                toggleEdit={this.toggleEdit}
                                                toggleModal={this.toggle}
                                            />
                                        )
                                    }
                                    <img
                                        src={user.photo || noAvatar}
                                        alt='avatar'
                                        width={32}
                                        height={32}
                                        className='img-fluid rounded-circle mt-2 mb-2 ml-4'
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
                                        {
                                            userPosts.selectedPost.author === this.props.loggedId &&
                                            (
                                                <div className='d-lg-block d-none float-right'>
                                                    <MenuPost
                                                        post={userPosts.selectedPost}
                                                        toggleEdit={this.toggleEdit}
                                                        toggleModal={this.toggle}
                                                    />
                                                </div>
                                            )
                                        }

                                    </div>
                                    <div className='d-lg-none'>
                                        <ProfileLikes postId={userPosts.selectedPost._id} />
                                    </div>
                                    <p>{formatDescription(desc)}</p>
                                </div>
                                <Comments postId={userPosts.selectedPost._id} />
                                <div className='flex-grow-0'>
                                    <div className='d-none d-lg-block p-3 mb-3 border-top border-bottom'>
                                        <ProfileLikes postId={userPosts.selectedPost._id} />
                                    </div>
                                    <WriteComment
                                        postId={userPosts.selectedPost._id}
                                    />
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
                            value={userPosts.selectedPost.newDescription}
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
