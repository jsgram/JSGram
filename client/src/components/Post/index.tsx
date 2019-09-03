import React from 'react';
import '../../styles/style.scss';
import { Waypoint } from 'react-waypoint';
import { IUserData } from '../Profile';
import { IPost } from '../../store/post/reducers';
import { Modal, ModalHeader, Spinner } from 'reactstrap';
import './style.scss';
import { MenuPost } from '../MenuPost';
import noAvatar from '../../assets/noAvatar.svg';

interface IProps {
    userPosts: any;
    user: IUserData;
    getPostsAsync: (username: string) => void;
    getMorePostsAsync: (username: string, page: number) => void;
    deletePhoto: () => void;
    addLike: (body: {}) => void;
    setCountOfLikes: (countOfLikes: number) => void;
    deleteLike: (body: {}) => void;
    countOfLikes: number;
    showPost: (post: any) => void;
    likeExist: boolean;
    checkUserLikeExist: (doesExist: boolean) => void;
    addOrRemoveAuthorOfLike: (arrayOfAuthorsOfLikes: []) => void;
}

interface IModalState {
    page: number;
    modal: boolean;
}

export default class Post extends React.Component<IProps> {

    public state: IModalState = {
        page: 1,
        modal: false,
    };

    public toggle = (post: any): any => {
        this.setState({
            modal: !this.state.modal,
        });
        this.props.showPost(post);
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
        const body = {userId: this.props.user._id, postId: this.props.userPosts.selectedPost._id};
        const index = this.props.userPosts.selectedPost.authorsOfLike.indexOf(body.userId);
        this.props.userPosts.selectedPost.authorsOfLike.splice(index, 1);
        this.props.deleteLike(body);
    }

    public onAddLike = (): void => {
        const body = {userId: this.props.user._id, postId: this.props.userPosts.selectedPost._id};
        this.props.userPosts.selectedPost.authorsOfLike.push(body.userId);
        this.props.addLike(body);
    }

    public setLikesCount = (): boolean | void => {
        if (this.props.userPosts.selectedPost.authorsOfLike !== undefined) {
            this.props.setCountOfLikes(this.props.userPosts.selectedPost.authorsOfLike.length);

            const arr = this.props.userPosts.selectedPost.authorsOfLike.filter((userId: string) => {
                return this.props.user._id === userId;
            });

            if (arr.length) {
                this.props.checkUserLikeExist(true);
                return true;
            }

            this.props.checkUserLikeExist(false);
            return false;
        }
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
                                        width={293}
                                        alt=''
                                        onClick={(): void => this.toggle(post)}
                                        className='img-fluid show-photo-like'
                                    />
                                    <span className='post-icon'><i className='fa fa-heart fa-lg'/>3</span>
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
                        <div className='container p-0'>
                            <div className='row'>
                                <div className='col-lg-8'>
                                    <ModalHeader className='d-lg-none display-1'
                                                 toggle={(): void => this.toggle(this.props.userPosts.selectedPost)}>
                                        <div className='row'>
                                            <MenuPost/>
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
                                        {this.props.countOfLikes ?
                                            <i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike}/>
                                            : <i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike}/>
                                        }
                                        <span>{this.props.countOfLikes} likes</span>
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
                                            <div className='comments ml-lg-0 pl-lg-0 pl-4'>
                                                <div className='row'>
                                                    <img
                                                        src={this.props.user.photo || noAvatar}
                                                        alt='avatar'
                                                        width={32}
                                                        height={32}
                                                        className='img-fluid mt-2 mr-2'
                                                    />
                                                    <span className='mt-2'>{this.props.user.username}</span>
                                                    <span className='d-lg-block d-none'><MenuPost/></span>
                                                </div>
                                                <p className='text-description'>
                                                    {this.props.userPosts.selectedPost.description}
                                                </p>
                                                <div className='d-lg-block d-none'>
                                                    <hr className='mt-0'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-lg-block d-none mt-1'>
                                        {this.setLikesCount()}
                                        {this.props.userPosts.selectedPost.authorsOfLike !== undefined &&
                                        this.props.likeExist ?
                                            <i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike}/>
                                            :
                                            <i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike}/>
                                        }
                                        <span>{this.props.countOfLikes} likes</span>
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
            </div>
        );
    }

}
