import React from 'react';
import '../../styles/style.scss';
import { Instagram } from 'react-content-loader';
import { Button, Spinner, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './style.scss';
import userphoto from '../../assets/user1.png';
import { FollowersData} from './FollowersData';
import { PopUpModal } from '../PopUp';
import noAvatar from '../../assets/noAvatar.svg';
import Menu from '../Menu';
import { Link } from 'react-router-dom';
import PostContainer from '../../containers/PostContainer';

export interface IUserData {
    posts: number;
    followers: number;
    following: number;
    description: string;
    fullName: string;
    username: string;
    photo: string;
    email: string;
    _id: string;
    getPostsAsync: () => void;
}

export interface IProfileProps {
    urlUsername: string;
    loggedUsername: string;
    user: IUserData;
    loaded: boolean;
    loading: boolean;
    getUser: (username: string) => void;
    deletePhoto: () => void;
    resetPosts: () => void;
    getPostsAsync: (username: string) => void;
}

export default class Profile extends React.Component<IProfileProps> {

    public state: { loaded: boolean, modal: boolean, followersModal: boolean, followingModal: boolean } = {
        loaded: false,
        modal: false,
        followersModal: false,
        followingModal: false,
    };
    public timerHandle: any = 0;

    public componentDidMount(): void {
        this.props.getUser(this.props.urlUsername);
    }

    public componentDidUpdate(prevProps: IProfileProps): void {
        if (prevProps.loaded !== this.props.loaded && this.props.loaded) {
            this.timerHandle = setTimeout(() => {
                this.setState({loaded: true});
                this.timerHandle = 0;
            },
                1500,
            );
        }

        if (this.props.urlUsername !== this.props.user.username && this.props.loaded) {
            this.setState({loaded: false});
            this.props.getUser(this.props.urlUsername);
            this.props.getPostsAsync(this.props.urlUsername);
        }
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timerHandle);
        this.timerHandle = 0;
    }

    public avatartoggle = (): void => {
        this.setState({modal: !this.state.modal});
    }

    public followerstoggle = (): void => {
        this.setState({ followersModal: !this.state.followersModal });
    }
    public followingtoggle = (): void => {
        this.setState({ followingModal: !this.state.followingModal });
    }

    public render(): JSX.Element {
        const {user: {posts, followers, following, fullName, username, description, photo}}: IProfileProps = this.props;
        const {loaded}: { loaded: boolean } = this.state;

        if (!loaded) {
            return (<Instagram/>);
        }
        return (
            <div
                className='row profile d-flex pt-2 justify-content-lg-center
                justify-content-sm-around justify-content-center'>
                <Menu/>
                <div className='mr-lg-5 mr-3'>
                    {this.props.loading ? <Spinner style={{height: 150, width: 150}} type='grow' color='dark'/> : <img
                        src={photo || noAvatar}
                        className='img-fluid float-right mb-2 avatar-img'
                        alt='avatar'
                        height={150}
                        width={150}
                        onClick={this.avatartoggle}
                    />}
                </div>
                <div className='ml-lg-5 d-sm-block d-flex flex-column'>
                    <p className='profile-name align-self-center'>
                        {username}
                        {this.props.urlUsername === this.props.loggedUsername &&
                        <Link to={`/profile/${this.props.urlUsername}/edit`}>
                            <button className='bg-dark ml-sm-5 ml-3 btn text-white'>
                                Edit profile
                            </button>
                        </Link>
                        }
                    </p>
                    <div className='d-flex followers justify-content-between'>
                        <div>
                            <button className='mr-2 following-button'><b>{posts}</b> posts</button>
                        </div>
                        <div>
                            <button onClick={this.followerstoggle} className='mr-2 following-button'>
                                <b>{followers}</b> followers</button>
                        </div>
                        <div>
                            <button onClick={this.followingtoggle} className='following-button'>
                                <b>{following}</b> following</button>
                        </div>
                    </div>
                    <div className='description mt-4'>
                        <strong>{fullName}</strong>
                        <p>{description}</p>
                    </div>
                    <Link to='/add-post'>
                        {this.props.urlUsername === this.props.loggedUsername &&
                        <Button className='btn' color='danger'><i
                            className='fa fa-plus pr-3'/>
                            Add Post
                        </Button>
                        }
                    </Link>
                    {this.state.modal && <PopUpModal
                        modal={this.state.modal}
                        toggleModal={this.avatartoggle}
                        loading={this.props.loading}
                        deletePhoto={this.props.deletePhoto}
                        photo={photo}
                    />}
                </div>
                <div className='container'>
                    <PostContainer username={this.props.urlUsername}/>
                </div>
                <Modal className='modal-dialog-centered followers-modal' isOpen={this.state.followingModal}>
                    <ModalHeader className='modal-header' toggle={this.followingtoggle}
                     cssModule={{'modal-title': 'w-100 text-center'}}>
                        <p>Following</p>
                    </ModalHeader>
                    <ModalBody className='modal-body'>
                    {FollowersData.map((item: any) => (
                        <div className='d-flex mr-2 justify-content-between mt-3 mb-2' key={item.username}>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>{item.username}</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    ))}
                    </ModalBody>
                </Modal>
                <Modal className='modal-dialog-centered followers-modal' isOpen={this.state.followersModal}>
                    <ModalHeader className='modal-header' toggle={this.followerstoggle}
                     cssModule={{'modal-title': 'w-100 text-center'}}>
                        <p>Followers</p>
                    </ModalHeader>
                    <ModalBody className='modal-body'>
                    {FollowersData.map((item: any) => (
                        <div className='d-flex mr-2 justify-content-between mt-3 mb-2' key={item.username}>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>{item.username}</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    ))}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
