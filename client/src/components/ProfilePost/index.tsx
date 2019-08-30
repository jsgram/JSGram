import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import './ProfilePost.scss';

interface IModalState {
    modal: boolean;
    postLike: boolean;
}

interface IProps {
    deletePhoto: () => void;
    addLike: () => void;
}

export default class ProfilePost extends React.Component<IProps, IModalState> {

    public postPhoto: any = [
        {
            id: 1,
            imgPath: 'https://picsum.photos/id/631/500/500',
            postDescription: 'abcasd',
            userAvatar: 'https://picsum.photos/id/631/500/500',
            userName: 'vova',
        },
        {
            id: 2,
            imgPath: 'https://picsum.photos/id/108/500/500',
            postDescription: '123',
            userAvatar: 'https://picsum.photos/id/108/500/500',
            userName: 'vova',
        },
        {
            id: 3,
            imgPath: 'https://picsum.photos/id/48/500/500',
            postDescription: 'i am i am i am i am it is nice day today',
            userAvatar: 'https://picsum.photos/id/48/500/500',
            userName: 'volodiarevura',
        },
    ];
// TODO fix post like
    constructor(props: IProps) {
        super(props);
        this.state = {
            modal: false,
            postLike: false,
        };

        this.toggle = this.toggle.bind(this);
        this.addLikeForPost = this.addLikeForPost.bind(this);
    }

    public toggle(): any {
        this.setState({
            modal: !this.state.modal,
        });
    }

    public addLikeForPost(): any {
        this.setState({
            postLike: true,
        });
    }

    public deletePhoto(): void {
        this.props.deletePhoto();
        this.toggle();
    }

    public addLike(): void {
        this.props.addLike();
        this.addLikeForPost();
    }

    public renderPost = (): any => {
        return (
            <div className='container '>
                <div className='row mt-5'>
                    {
                        this.postPhoto.map((post: {
                            id: number,
                            imgPath: string,
                            postDescription: string,
                            userAvatar: string,
                            userName: string,
                        }) => {
                            return (
                                        <div className='col-sm-4 text-center pt-2 user-post' key={post.id}>
                                            <img
                                                src={post.imgPath}
                                                height={293}
                                                alt='post'
                                                onClick={this.toggle}
                                                className='img-fluid'
                                            />
                                        <Modal className='modal-dial modal-lg modal-dialog-centered'
                                               isOpen={this.state.modal}
                                               toggle={this.toggle}>
                                            <div className='modal-body p-0'>
                                                <div className='container p-0'>
                                                    <div className='row'>
                                                        <div className='col-lg-8'>
                                                            <ModalHeader className='d-lg-none display-1'
                                                                         toggle={this.toggle}>
                                                                <div>
                                                                    <img
                                                                        src={post.userAvatar}
                                                                        alt='avatar'
                                                                        width={32}
                                                                        height={32}
                                                                        className='img-fluid rounded-circle mt-2 mr-2'
                                                                    />
                                                                    <span>{post.userName}</span>
                                                                </div>
                                                            </ModalHeader>
                                                            <img
                                                                src={post.imgPath}
                                                                className='w-100 img-fluid'
                                                                alt='post'/>
                                                        </div>
                                                        <div className='col-lg-4'>
                                                            <div className='d-lg-block d-none'>
                                                                <img
                                                                    src={post.userAvatar}
                                                                    alt='avatar'
                                                                    width={32}
                                                                    height={32}
                                                                    className='img-fluid rounded-circle mt-2 mr-2'
                                                                />
                                                                <span>{post.userName}</span>
                                                                <div className='d-lg-block d-none'>
                                                                    <hr className='mb-0'/>
                                                                </div>
                                                            </div>
                                                            <div className='d-lg-block d-none'>
                                                                <img
                                                                    src={post.userAvatar}
                                                                    alt='avatar'
                                                                    width={32}
                                                                    height={32}
                                                                    className='img-fluid rounded-circle mt-2 mr-2'
                                                                />
                                                                <span>{post.userName}</span>
                                                                <p>{post.postDescription}</p>
                                                            </div>
                                                            <div className='d-lg-none d-block mt-1 mb-2'>
                                                                <i className=
                                                                       {this.state.postLike ?
                                                                           'fa fa-heart fa-lg pr-1 like' :
                                                                           'fa fa-heart-o fa-lg pr-1'}
                                                                   onClick={this.addLikeForPost}
                                                                />
                                                                <span>72 likes</span>
                                                            </div>
                                                            <div className='description-post'>
                                                                <div className='comments'>
                                                                    <div>
                                                                        <img
                                                                            src={post.userAvatar}
                                                                            alt='avatar'
                                                                            width={32}
                                                                            height={32}
                                                                            className='img-fluid rounded-circle
                                                                            mt-2 mr-2'
                                                                        />
                                                                        <span>{post.userName}</span>
                                                                        <p>Today is a nice day.Today is a
                                                                            nice day.Today is a nice day</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='d-lg-block d-none'>
                                                                <hr className='mt-0'/>
                                                            </div>
                                                            <div className='d-lg-block d-none mt-1'>
                                                                <i className=
                                                                       {this.state.postLike ?
                                                                           'fa fa-heart fa-lg pr-1 like' :
                                                                           'fa fa-heart-o fa-lg pr-1'}
                                                                   onClick={this.addLikeForPost}
                                                                />
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
                                    </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        return (
            this.renderPost()
        );
    }
}
