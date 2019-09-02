import React from 'react';
import '../../styles/style.scss';
import { Waypoint } from 'react-waypoint';
import { IUserData } from '../Profile';
import { IPost } from '../../store/post/reducers';
import { Modal, ModalHeader, Spinner, Input, FormGroup, Button } from 'reactstrap';
import './style.scss';
import { MenuPost } from '../MenuPost';
import noAvatar from '../../assets/noAvatar.svg';

interface IProps {
    userPosts: any;
    user: IUserData;
    editDescriptionForPost: any;
    getPostsAsync: (username: string) => void;
    getMorePostsAsync: (username: string, page: number) => void;
    deletePhoto: () => void;
    editPost: (description: string, id: any) => void;
    showPost: (post: any) => void;
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

    public render(): JSX.Element {
        return (
            <div className='container justify-content-center'>
                <div className='row mt-5 profile-post'>
                    {
                        this.props.userPosts.posts.map((post: IPost) => (
                                <div key={post._id} className='col-sm-4 text-center pt-2 post-photo'>
                                    <img
                                        src={post.imgPath}
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
                <Modal className='profile-post modal-dial modal-lg modal-dialog-centered'
                       isOpen={this.state.modal}
                    toggle={(): void => this.toggle(this.props.userPosts.selectedPost)}>
                    <div className='modal-body p-0'>
                        <div className='container p-0'>
                            <div className='row'>
                                <div className='col-lg-8'>
                                    <ModalHeader className='d-lg-none display-1'>
                                        <div className='row'>
                                            <MenuPost
                                                post={this.props.userPosts.selectedPost}
                                                toggleEdit={this.toggleEdit}
                                            />
                                            <img
                                                src={this.props.user.photo || noAvatar}
                                                alt='avatar'
                                                width={32}
                                                height={32}
                                                className='img-fluid rounded-circle mt-2 ml-4'
                                            />
                                            <span className='mt-2 ml-2'>{this.props.user.username}</span>
                                        </div>
                                    </ModalHeader>
                                    <img
                                        src={this.props.userPosts.selectedPost.imgPath}
                                        className='w-100 img-fluid'
                                        alt='post'/>
                                </div>
                                <div className='col-lg-4'>
                                    <div className='d-lg-none d-block mt-1 mb-2'>
                                        <i className='fa fa-heart-o fa-lg pr-1'/>
                                        <span>72 likes</span>
                                    </div>
                                    <div className='description-post'>
                                        <div className='d-lg-none d-block comments'>
                                            <img
                                                src={this.props.user.photo}
                                                alt='avatar'
                                                width={32}
                                                height={32}
                                                className='img-fluid rounded-circle
                                                                        mt-2 mr-2'
                                            />
                                            <span>{this.props.user.username}</span>
                                            <p>{this.props.userPosts.selectedPost.description}</p>
                                        </div>
                                        <div className='d-none d-lg-block comments'>
                                            <div className='row'>
                                                <img
                                                    src={this.props.user.photo || noAvatar}
                                                    alt='avatar'
                                                    width={32}
                                                    height={32}
                                                    className='img-fluid mt-2 mr-2'
                                                />
                                                <span className='mt-2'>{this.props.user.username}</span>
                                                <MenuPost
                                                    post={this.props.userPosts.selectedPost}
                                                    toggleEdit={this.toggleEdit}
                                                />
                                            </div>
                                            <p>{this.props.userPosts.selectedPost.description}</p>
                                        </div>
                                    </div>
                                    <div className='d-lg-block d-none'>
                                        <hr className='mt-0'/>
                                    </div>
                                    <div className='d-lg-block d-none mt-1'>
                                        <i className='fa fa-heart-o fa-lg pr-1'/>
                                        <span>72 likes</span>
                                    </div>
                                    <div className='d-lg-block d-none'>
                                        <hr/>
                                    </div>
                                    <div className='mt-3'>
                                        <textarea
                                            className='add-comment p-0 border-0'
                                            placeholder='Add your comment...'
                                            autoComplete='off'>
                                        </textarea>
                                        <button
                                            className='button-comment p-0 border-0
                                                        float-lg-none float-right'
                                            type='submit'
                                            disabled>
                                            Add comment
                                        </button>
                                    </div>
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
                            height={293}
                            id={this.props.userPosts.selectedPost._id}
                            alt='post'
                            className='img-fluid'
                        />
                    </FormGroup>
                    <FormGroup className='m-3'>
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
