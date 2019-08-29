import React from 'react';
import '../../styles/style.scss';
import { Instagram } from 'react-content-loader';
import { Button, Spinner } from 'reactstrap';
import './Profile.scss';
import PopUpModal from '../PopUp';
import noAvatar from '../../assets/noAvatar.svg';
import Menu from '../Menu';
import { Link } from 'react-router-dom';
import ProfilePost from '../ProfilePost';
export interface IUserData {
    posts: number;
    followers: number;
    following: number;
    description: string;
    fullName: string;
    username: string;
    photo: string;
    email: string;
}

interface IFormProps {
    getUser: () => void;
    deletePhoto: () => void;
    addLike: any;
    user: IUserData;
    loaded: boolean;
    loading: boolean;
}

export default class Profile extends React.Component<IFormProps> {

    public state: { loaded: boolean } = {
        loaded: false,
    };
    public timerHandle: any = 0;

    public componentDidMount(): void {
        this.props.getUser();

    }

    public componentDidUpdate(prevProps: any): void {
        if (prevProps.loaded !== this.props.loaded && this.props.loaded) {
            this.timerHandle = setTimeout(() => {
                this.setState({loaded: true});
                this.timerHandle = 0;
            },
                3000,
            );
        }
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timerHandle);
        this.timerHandle = 0;
    }

    public render(): JSX.Element {
        const {user: {posts, followers, following, fullName, username, description, photo}}: any = this.props;
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
                    <img
                        src={photo || noAvatar}
                        className='img-fluid float-right'
                        alt='avatar'
                        height={150}
                        width={150}
                    />
                </div>
                <div className='ml-lg-5 d-sm-block d-flex flex-column'>
                    <p className='profile-name align-self-center'>
                        {fullName}
                        <Link to='/profile/edit'>
                            <button className='bg-dark ml-5 btn text-white'>
                                Edit profile
                            </button>
                        </Link>
                        {this.props.loading && <Spinner className='mt-3' color='dark'/>}
                    </p>
                    <div className='d-flex followers align-self-center'>
                        <div>
                            <a href='#/' className='mr-5'><b>{posts}</b> posts</a>
                        </div>
                        <div>
                            <a href='#/' className='mr-5'><b>{followers}</b> followers</a>
                        </div>
                        <div>
                            <a href='#/'><b>{following}</b> following</a>
                        </div>
                    </div>
                    <div className='description mt-4'>
                        <strong>{username}</strong>
                        <p>{description}</p>
                    </div>
                    <Link to='/add-post'>
                        <Button className='btn' color='danger'><i
                            className='fa fa-plus pr-3'/>
                            Add Post
                        </Button>
                    </Link>
                    <PopUpModal deletePhoto={this.props.deletePhoto}/>
                </div>
                <ProfilePost deletePhoto={this.props.deletePhoto} addLike={this.props.addLike} />
            </div>
        );
    }
}
