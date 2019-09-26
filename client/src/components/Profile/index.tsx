import React from 'react';
import '../../styles/style.scss';
import { Instagram } from 'react-content-loader';
import { Button, Modal, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import './style.scss';
import { PopUpModal } from '../PopUp';
import noAvatar from '../../assets/noAvatar.png';
import Menu from '../Menu';
import { Link } from 'react-router-dom';
import PostContainer from '../../containers/PostContainer';
import { IFeedState } from '../../store/feed/reducers';

export interface IUserData {
    posts: number;
    followers: number[];
    following: number[];
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
    loggedId: string;
    loggedUsername: string;
    loggedUser: IFeedState;
    user: IUserData;
    loaded: boolean;
    loading: boolean;
    loadFollow: boolean;
    getUser: (username: string) => void;
    followUser: (body: { _id: string }) => void;
    unfollowUser: (body: { _id: string }) => void;
    deletePhoto: () => void;
    resetPosts: () => void;
    getPostsAsync: (username: string) => void;
    deleteUser: (id: string) => void;
}

export default class Profile extends React.Component<IProfileProps> {

    public state: { loaded: boolean, modal: boolean, deleteUserModal: boolean } = {
        loaded: false,
        modal: false,
        deleteUserModal: false,
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

    public toggleModal = (): void => {
        this.setState({modal: !this.state.modal});
    }

    public toggleDeleteUserModal = (): void => {
        this.setState({deleteUserModal: !this.state.deleteUserModal});
    }

    public deleteUser = (id: string): void => {
        this.props.deleteUser(id);
        this.toggleDeleteUserModal();
    }

    public followUrlUser = (): void => {
        const body = {_id: this.props.user._id};
        this.props.followUser(body);
    }

    public unfollowUrlUser = (): void => {
        const body = {_id: this.props.user._id};
        this.props.unfollowUser(body);
    }

    public filterUserList = (userList: any): IUserData[] =>
        userList.filter((follower: string) => follower === this.props.loggedId,
        )

    public dynamicButton = (): any => {
        const loggedUserAlreadyFollowUrlUser = this.filterUserList(this.props.user.followers);
        const urlUserAlreadyFollowLoggedUser = this.filterUserList(this.props.user.following);

        if (this.props.loadFollow) {
            return <span><Spinner color='light'/></span>;
        }

        if (this.props.urlUsername === this.props.loggedUsername) {
            return (
                <Link to='/add-post' className='align-self-start'>
                    <Button className='btn' color='danger'><i
                        className='fa fa-plus pr-3'/>
                        Add Post
                    </Button>
                </Link>
            );
        }

        if (!!loggedUserAlreadyFollowUrlUser.length) {
            return (
                <span onClick={this.unfollowUrlUser}>
                        <Button className='btn' color='danger'><i
                            className=''
                        />
                            Unfollow
                        </Button>
                    </span>
            );
        }

        if (!!urlUserAlreadyFollowLoggedUser.length) {
            return (
                <span onClick={this.followUrlUser}>
                            <Button className='btn' color='danger'><i
                                className=''
                            />
                                Follow back
                            </Button>
                        </span>
            );
        }

        if (!urlUserAlreadyFollowLoggedUser.length) {
            return (
                <span onClick={this.followUrlUser}>
                            <Button className='btn' color='danger'><i
                                className=''
                            />
                                Follow
                            </Button>
                        </span>
            );
        }
    }

    public render(): JSX.Element {
        const {user: {posts, followers, following, fullName, username, description, photo, _id}}
            : IProfileProps = this.props;
        const {loaded}: { loaded: boolean } = this.state;

        if (!loaded) {
            return (<Instagram/>);
        }

        const avatarCursor = (this.props.loggedId === _id && ' avatar-img');

        return (
            <div
                className='row profile d-flex pt-2 justify-content-lg-center
                justify-content-sm-around justify-content-center'>
                <Menu/>
                <div className='mr-lg-5 mr-3'>
                    {this.props.loading ? <Spinner style={{height: 150, width: 150}} type='grow' color='dark'/> : <img
                        src={photo || noAvatar}
                        className={'img-fluid rounded-circle float-right mb-2' + avatarCursor}
                        alt='avatar'
                        height={150}
                        width={150}
                        onClick={(): void => {
                            if (this.props.loggedId === _id) {
                                this.toggleModal();
                            }
                        }}
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
                            <a href='#/' className='mr-2'><b>{posts}</b> posts</a>
                        </div>
                        <div>
                            <Link to={`/profile/${this.props.urlUsername}/followers`}
                                className='mr-2'><b>{followers.length}</b> followers
                            </Link>
                        </div>
                        <div>
                            <Link to={`/profile/${this.props.urlUsername}/following`}>
                                <b>{following.length}</b> following
                            </Link>
                        </div>
                    </div>
                    <div className='description mt-4'>
                        <strong>{fullName}</strong>
                        { this.props.urlUsername === this.props.loggedUsername &&
                                <Link to='/logout' className='text-danger pl-1'>(Logout)</Link> }
                        <p>{description}</p>
                    </div>
                    {
                        this.props.loggedUser.isAdmin &&
                            <>
                                <Button
                                    className='btn d-block mb-2'
                                    color='danger'
                                    onClick={this.toggleDeleteUserModal}
                                >
                                    <i className='fa fa-user-times pr-1'></i>
                                    Delete User
                                </Button>
                                <Modal
                                    isOpen={this.state.deleteUserModal}
                                    toggle={this.toggleDeleteUserModal}
                                    className='modal-dialog-centered px-md-0 py-md-0 px-3 py-3'
                                >
                                    <ModalBody>
                                        Do you really want to delete user ?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color='danger'
                                            onClick={(): void => this.deleteUser(_id)}
                                        >
                                            Delete
                                        </Button>{' '}
                                        <Button
                                            outline
                                            color='danger'
                                            onClick={this.toggleDeleteUserModal}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </>
                    }
                    {this.dynamicButton()}
                    {this.state.modal && <PopUpModal
                        modal={this.state.modal}
                        toggleModal={this.toggleModal}
                        loading={this.props.loading}
                        deletePhoto={this.props.deletePhoto}
                        photo={photo}
                    />}
                </div>
                <div className='container'>
                    <PostContainer username={this.props.urlUsername}/>
                </div>
            </div>
        );
    }
}
