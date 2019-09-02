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
    count: number;
    like: boolean;
    addLike: () => void;
    deleteLike: () => void;
    addLikeAsync: (body: any) => void;
    deleteLikeAsync: (body: any) => void;
}

interface IModalState {
    page: number;
    modal: boolean;
    post: any;
}

export default class Post extends React.Component<IProps> {

    public state: IModalState = {
        page: 1,
        modal: false,
        post: {},
    };

    public toggle = (post: any): any => {
        this.setState({
            modal: !this.state.modal,
            post,
        });
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

    public onDeleteLike1=(): void =>{
        console.log('onDeletelike');
        console.log(this.props);
        const body = {userId: this.props.user.id , postId: this.state.post._id};
        this.props.deleteLikeAsync(body);
    }
    public onAddLike1=(): void =>{
        console.log('onAddlike');
        const body = {userId: this.props.user.id , postId: this.state.post._id};
        this.props.addLikeAsync(body);
    }

    public render(): JSX.Element {
        // console.log(this.props.user);
        return (
            <div className='container justify-content-center'>
                <div className='row mt-5 profile-post'>
                    {
                        this.props.userPosts.posts.map((post: IPost, i: number) => (
                                <div key={i} className='col-sm-4 text-center pt-2 post-photo'>
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
                       toggle={(): void => this.toggle(this.state.post)}>
                    <div className='modal-body p-0'>
                        <div className='container p-0'>
                            <div className='row'>
                                <div className='col-lg-8'>
                                    <ModalHeader className='d-lg-none display-1'>
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
                                        src={this.state.post.imgPath}
                                        className='w-100 img-fluid'
                                        alt='post'/>
                                </div>
                                <div className='col-lg-4'>
                                    <div className='d-lg-none d-block mt-1 mb-2'>
                                        {this.props.like ?
                                            <i className='fa fa-heart fa-lg pr-1 like' onClick={this.onAddLike1}/>
                                            : <i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike1}/>
                                        }
                                        <span>{this.props.count} likes</span>
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
                                            <p>{this.state.post.description}</p>
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
                                                <MenuPost/>
                                            </div>
                                            <p>{this.state.post.description}</p>
                                        </div>
                                    </div>
                                    <div className='d-lg-block d-none'>
                                        <hr className='mt-0'/>
                                    </div>
                                    <div className='d-lg-block d-none mt-1'>
                                        {this.props.like ?
                                            <i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike1}/>
                                            : <i className='fa fa-heart-o fa-lg pr-1' onClick={() => {this.onAddLike1()}}/>
                                        }
                                        <span>{this.props.count} likes</span>
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
            </div>
        );
    }

}
