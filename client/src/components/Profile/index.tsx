import React from 'react';
import '../../styles/style.scss';
import { Instagram } from 'react-content-loader';
import { Button, Spinner } from 'reactstrap';
import './Profile.scss';
import PopUpModal from '../PopUp';
import noAvatar from '../../assets/noAvatar.svg';
import Menu from '../Menu';
import { Link } from 'react-router-dom';
import ProfileEditContainer from '../../containers/ProfileEditContainer/ProfileEditContainer';
import EmailChange from '../EmailChange';

export interface IUserData {
    posts: number;
    followers: number;
    following: number;
    description: string;
    fullName: string;
    username: string;
    photo: string;
}

interface IFormProps {
    getUser: () => void;
    deletePhoto: () => void;
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
                        <Button className='bg-dark ml-5 btn'>
                            Edit profile
                        </Button>
                        {this.props.loading && <Spinner className='mt-3' color='dark'/>}
                    </p>
                    <div className='d-flex followers align-self-center'>
                        <div>
                            <a href='#' className='mr-sm-5 mr-3'>Posts</a>
                            <p className='pl-2'>{posts}</p>
                        </div>
                        <div>
                            <a href='#' className='mr-sm-5 mr-3'>Followers</a>
                            <p className='pl-4'>{followers}</p>
                        </div>
                        <div>
                            <a href='#'>Following</a>
                            <p className='pl-4'>{following}</p>
                        </div>
                    </div>
                    <div className='description'>
                        <strong>{username}</strong>
                        <p className='text-justify'>{description}</p>
                    </div>
                    <Link to='/add-post'>
                        <Button className='btn' color='danger'><i
                            className='fa fa-plus pr-3'/>
                            Add Post
                        </Button>
                    </Link>
                    <PopUpModal deletePhoto={this.props.deletePhoto}/>
                    <ProfileEditContainer/>
                    <EmailChange/>
                </div>
            </div>
        );
    }
}
