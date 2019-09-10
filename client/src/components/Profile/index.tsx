import React from 'react';
import '../../styles/style.scss';
import { Instagram } from 'react-content-loader';
import { Button, Spinner } from 'reactstrap';
import './style.scss';
import { PopUpModal } from '../PopUp';
import noAvatar from '../../assets/noAvatar.svg';
import Menu from '../Menu';
import { Link } from 'react-router-dom';
import PostContainer from '../../containers/PostContainer';

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
    user: IUserData;
    loaded: boolean;
    loading: boolean;
    loadFollow: boolean;
    getUser: (username: string) => void;
    followUser: any; // TODO fix any
    unfollowUser: any; // TODO fix any
    deletePhoto: () => void;
    resetPosts: () => void;
    getPostsAsync: (username: string) => void;
}

export default class Profile extends React.Component<IProfileProps> {

    public state: { loaded: boolean, modal: boolean } = {
        loaded: false,
        modal: false,
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

    public followUrlUser = (): void => {
        const body = {_id: this.props.user._id};
        this.props.followUser(body);
    }

    public unfollowUrlUser = (): void => {
        const body = {_id: this.props.user._id};
        this.props.unfollowUser(body);
    }

    public render(): JSX.Element {
        const {user: {posts, followers, following, fullName, username, description, photo}}: IProfileProps = this.props;
        const {loaded}: { loaded: boolean } = this.state;

        const loggedUserAlreadyFollowUrlUser =
            followers.filter((follower: any) => follower === this.props.loggedId);
        const urlUserAlreadyFollowLoggedUser =
            following.filter((follower: any) => follower === this.props.loggedId);

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
                        onClick={this.toggleModal}
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
                            <a href='#/' className='mr-2'><b>{followers.length}</b> followers</a>
                        </div>
                        <div>
                            <a href='#/'><b>{following.length}</b> following</a>
                        </div>
                    </div>
                    <div className='description mt-4'>
                        <strong>{fullName}</strong>
                        <p>{description}</p>
                    </div>
                    {this.props.loadFollow ? <Spinner color='light'/> :
                        this.props.urlUsername === this.props.loggedUsername ?
                        <Link to='/add-post'>
                            <Button className='btn' color='danger'><i
                                className='fa fa-plus pr-3'/>
                                Add Post
                            </Button>
                        </Link>
                        :
                        !!loggedUserAlreadyFollowUrlUser.length ?
                            <span onClick={this.unfollowUrlUser}>
                                <Button className='btn' color='danger'><i
                                    className=''
                                />
                                    Unfollow
                                </Button>
                            </span>
                            :
                            !!urlUserAlreadyFollowLoggedUser.length ?
                                <span onClick={this.followUrlUser}>
                                    <Button className='btn' color='danger'><i
                                        className=''
                                    />
                                        Follow back
                                    </Button>
                                </span>
                                :
                                <span onClick={this.followUrlUser}>
                                    <Button className='btn' color='danger'><i
                                        className=''
                                    />
                                        Follow
                                    </Button>
                                </span>
                    }
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
