import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import './ProfilePost.scss';

interface IModalState {
    modal: boolean;
    flag: boolean;
}

interface IProps {
    deletePhoto: () => void;
    addLike: () => void;
}

export default class ProfilePost extends React.Component<IProps, IModalState> {

    public postPhoto: any = [
        {imgPath: 'https://picsumphotos./500'},
    ];

    constructor(props: IProps) {
        super(props);
        this.state = {
            modal: false,
            flag: false,
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
            flag: true,
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

    public render(): JSX.Element {
        const imagePost = this.postPhoto.map((imgPath: any) => {
            const {photoPost}: any = imgPath;
            return (
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-sm-4 text-center pt-4 user-post'>
                            <img
                                src={photoPost}
                                width={293}
                                height={293}
                                alt='post'
                                className='img-fluid'
                                onClick={this.toggle}
                            />
                        </div>
                        <div className='col-sm-4 text-center pt-4'>
                            <img
                                src={photoPost}
                                width={293}
                                height={293}
                                alt='post'
                                className='img-fluid'
                            />
                        </div>
                        <div className='col-sm-4 text-center pt-4'>
                            <img
                                src={photoPost}
                                width={293}
                                height={293}
                                alt='post'
                                className='img-fluid'
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-4 text-center pt-3'>
                            <img
                                src={photoPost}
                                width={293}
                                height={293}
                                alt='post'
                                className='img-fluid'
                            />
                        </div>
                    </div>
                    <Modal className='modal-dialog modal-lg modal-dialog-centered'
                           isOpen={this.state.modal}
                           toggle={this.toggle}
                    >
                        <div className='modal-content'>
                            <div className='modal-body p-0'>
                                <div className='container p-0'>

                                    <div className='row'>
                                        <div className='col-lg-8'>
                                            <ModalHeader className='d-lg-none display-1' toggle={this.toggle}>
                                                <div className='text-center'>
                                                    <img
                                                        src={photoPost}
                                                        alt='avatar'
                                                        width={32}
                                                        height={32}
                                                        className='img-fluid rounded-circle mt-2 mr-2'
                                                    />
                                                    <span>volodiarevura</span>
                                                </div>
                                            </ModalHeader>
                                            <img
                                                src={photoPost}
                                                className='w-100 img-fluid'
                                                alt=''/>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='d-lg-block d-none'>
                                                <img
                                                    src={photoPost}
                                                    alt='avatar'
                                                    width={32}
                                                    height={32}
                                                    className='img-fluid rounded-circle mt-2 mr-2'
                                                />
                                                <span>volodiarevura</span>
                                                <div className='d-lg-block d-none'>
                                                    <hr className='mb-0'/>
                                                </div>
                                            </div>
                                            <div className='d-lg-block d-none'>
                                                <img
                                                    src={photoPost}
                                                    alt='avatar'
                                                    width={32}
                                                    height={32}
                                                    className='img-fluid rounded-circle mt-2 mr-2'
                                                />
                                                <span>volodiarevura</span>
                                                <p>Description to this post!Description to this post!</p>
                                            </div>
                                            <div className='d-lg-none d-block mt-1 mb-2'>
                                                <i className=
                                                       {this.state.flag ?
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
                                                            src={photoPost}
                                                            alt='avatar'
                                                            width={32}
                                                            height={32}
                                                            className='img-fluid rounded-circle mt-2 mr-2'
                                                        />
                                                        <span>Ostap</span>
                                                        <p>Today is a nice day.Today is a nice day.Today is a nice
                                                            day</p>
                                                    </div>
                                                    <div>
                                                        <img
                                                            src={photoPost}
                                                            alt='avatar'
                                                            width={32}
                                                            height={32}
                                                            className='img-fluid rounded-circle mt-2 mr-2'
                                                        />
                                                        <span>Artem</span>
                                                        <p>Useful information.Useful information.Useful information</p>
                                                    </div>
                                                    <div>
                                                        <img
                                                            src='https://picsum.photos/500'
                                                            alt='avatar'
                                                            width={32}
                                                            height={32}
                                                            className='img-fluid rounded-circle mt-2 mr-2'
                                                        />
                                                        <span>Rostik</span>
                                                        <p>Useful information.Useful information.Useful information</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-lg-block d-none'>
                                                <hr className='mt-0'/>
                                            </div>
                                            <div className='d-lg-block d-none mt-1'>
                                                <i className=
                                                       {this.state.flag ?
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
                                                    className='button-comment p-0 border-0 float-lg-none float-right'
                                                    type='submit'
                                                    disabled>
                                                    Add comment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        });

        return (imagePost);
    }
}
