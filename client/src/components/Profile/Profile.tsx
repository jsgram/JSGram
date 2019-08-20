import React from 'react';
import '../styles/style.scss';
import { Instagram } from 'react-content-loader';
import { Button } from 'reactstrap';
import '../styles/Profile.scss';
import Cropper from '../Cropper/Cropper';
import noAvatar from '../assets/noAvatar.svg';

import { Menu } from '../Menu/Menu';


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
    user: IUserData;
    loaded: boolean;
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

            <div className='container'>
                <Menu/>
                <div className='row'>
                    <div className='profile d-flex mt-5'>
                        <div className='col-4 mr-sm-4'>
                            <img
                                src={photo || noAvatar }
                                className='img-fluid float-right'
                                alt='avatar'
                                height={150}
                                width={150}
                            />
                        </div>
                        <div>
                            <p className='profile-name'>
                                {fullName}
                                <Button className='bg-dark ml-2 btn'>
                                    Edit profile
                                </Button>
                            </p>
                            <div className='d-flex followers'>
                                <div>
                                    <a href='#' className='mr-sm-4 mr-3'>Posts</a>
                                    <p className='pl-2'>{posts}</p>
                                </div>
                                <div>
                                    <a href='#' className='mr-sm-4 mr-3'>Followers</a>
                                    <p className='pl-4'>{followers}</p>
                                </div>
                                <div>
                                    <a href='#'>Following</a>
                                    <p className='pl-4'>{following}</p>
                                </div>
                            </div>
                            <div className='description text-justify'>
                                <strong>{username}</strong>
                                <p>{description}</p>
                            </div>
                            <Button className='btn' color='danger'><i
                                className='fa fa-plus pr-3'/>
                                Add Post
                            </Button>
                        </div>
                    </div>
                </div>
                <Cropper/>
            </div>
        );
    }
}
