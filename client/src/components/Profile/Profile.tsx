import React from 'react';
import '../styles/style.scss';
import { Instagram } from 'react-content-loader';
import { Button } from 'reactstrap';
import '../styles/Profile.scss';

export interface IUserData {
    first_name: string;
    last_name: string;
    avatar: string;
}

interface IFormProps {
    getUser: () => void;
    user: IUserData;
    loaded: boolean;
}

export default class Profile extends React.Component<IFormProps> {

    public state: {loaded: boolean} = {
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
        const {user: {first_name, last_name, avatar}}: any = this.props;
        const {loaded}: {loaded: boolean} = this.state;

        if (!loaded) {
            return (<Instagram/>);
        }
        return (
                <div className='profile-header'>
                    <div className='container'>
                        <div className='row'>
                            <div className='profile d-flex mt-5'>
                                <div className='col-md-4 col-sm-4 col-4 mr-md-4 mr-sm-4'>
                                    <img
                                        src={avatar}
                                        className='img-fluid rounded-circle'/>
                                </div>
                                <div>
                                    <p className='profile-name'>
                                        {first_name} {last_name}
                                        <Button className='bg-dark ml-md-2 ml-sm-2 ml-2 btn'>
                                            Edit profile
                                        </Button>
                                    </p>
                                    <div className='d-flex followers'>
                                        <div>
                                            <a href='#' className='mr-md-4 mr-sm-4 mr-3'>Posts</a>
                                            <p>1000</p>
                                        </div>
                                        <div>
                                            <a href='#' className='mr-md-4 mr-sm-4 mr-3'>Followers</a>
                                            <p className='ml-3'>50m</p>
                                        </div>
                                        <div>
                                            <a href='#'>Following</a>
                                            <p className='ml-4'>12</p>
                                        </div>
                                    </div>
                                    <Button className='btn' color='danger'><i
                                        className='fa fa-plus pr-3'/>Add
                                        Post</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
