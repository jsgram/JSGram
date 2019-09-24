import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Container, Button, Spinner } from 'reactstrap';
import noAvatar from '../../assets/noAvatar.png';
import './style.scss';
import Menu from '../Menu';
import { Link } from 'react-router-dom';
import { IUserData } from '../Profile';

export interface ISubscribersProps {
    path: any;
    loggedId: string;
    urlUsername: string;
    user: IUserData;
    page: number;
    allSubscribersLoaded: boolean;
    subscribers: [];
    followersCount: number;
    followingCount: number;
    loaded: boolean;
    loading: boolean;
    loadFollow: boolean;
    getUser: (username: string) => void;
    getSubscribers: (loggedId: string, subscribers: string, urlUsername: string, page: number,) => void;
    setSubscribersCount: (followersCount: number, followingCount: number) => void;
    changeUserFollowing: (_id: string, followType: string) => void;
    resetSubscribers: () => void;
}

export class Subscribers extends React.Component<ISubscribersProps> {
    public componentDidMount(): void {
        this.props.getUser(this.props.urlUsername);
    }

    public componentDidUpdate(prevProps: any): void {
        if (prevProps.user !== this.props.user) {
            const {followers, following}: IUserData = this.props.user;
            this.props.setSubscribersCount(followers.length, following.length);
        }

        if (prevProps.loggedId !== this.props.loggedId) {
            this.props.getSubscribers(
                this.props.loggedId,
                this.getParamForSubscribers(),
                this.props.urlUsername,
                this.props.page,
            );
        }
    }

    public componentWillUnmount(): void {
        this.props.resetSubscribers();
    }

    public getMoreFollowers = (): void => {
        if (!this.props.allSubscribersLoaded && this.props.loggedId) {
            this.props.getSubscribers(
                this.props.loggedId,
                this.getParamForSubscribers(),
                this.props.urlUsername,
                this.props.page,
            );
        }
    }

    public followSubscriber = (_id: string): void => {
        this.props.changeUserFollowing(_id, 'follow');
    }

    public unfollowSubscriber = (_id: string): void => {
        this.props.changeUserFollowing(_id, 'unFollow');
    }

    public dynamicButton = (_id: string, alreadyFollow: boolean): JSX.Element => {
        if (this.props.loadFollow) {
            return <span><Spinner color='light'/></span>;
        }

        if (alreadyFollow) {
            return (
                <span onClick={(): any => this.unfollowSubscriber(_id)}>
                        <Button className='btn' color='danger'>
                            Unfollow
                        </Button>
                    </span>
            );
        }

        return (
            <span onClick={(): any => this.followSubscriber(_id)}>
                            <Button className='btn' color='danger'>
                                Follow
                            </Button>
                        </span>
        );
    }

    public render(): JSX.Element {
        const subscribers = this.props.path.includes('following');

        return (
            <Container>
                <Menu/>
                <div className='d-flex justify-content-center'>
                    <Link to={`/profile/${this.props.urlUsername}/followers`} className='link-style'
                          style={{textDecoration: !subscribers ? 'underline' : 'none'}}
                    >
                        <h4
                            className='font-weight-light text-secondary text-uppercase'
                        >
                            {this.props.followersCount} followers
                        </h4>
                    </Link>
                    < Link to={`/profile/${this.props.urlUsername}/following`} className='link-style'
                           style={{textDecoration: subscribers ? 'underline' : 'none'}}
                    >
                        <h4
                            className='font-weight-light text-secondary text-uppercase'
                        >
                            {this.props.followingCount} following
                        </h4>
                    </Link>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='follow-wrapper'>
                        {this.props.loggedId &&
                        <div>{this.props.subscribers.map((subscriber: any) =>
                            <div className='d-flex mt-1 mb-3 justify-content-between' key={subscriber._id}>
                                <div className='row'>
                                    <img
                                        src={subscriber.photoPath || noAvatar}
                                        alt='avatar'
                                        width={32}
                                        height={32}
                                        className='img-fluid rounded-circle ml-2 mr-2 mt-1'
                                    />
                                    <h6 className='align-self-end'>
                                        <Link
                                            to={`/profile/${subscriber.username}`}
                                            className='text-dark'>{subscriber.username}
                                        </Link>
                                    </h6>
                                </div>
                                {this.props.loggedId !== subscriber._id &&
                                this.dynamicButton(subscriber._id, subscriber.alreadyFollow)}
                            </div>,
                        )}
                        </div>
                        }
                        {this.props.loading &&
                        <div className='d-flex justify-content-center'>
                            <Spinner className='mt-3' color='dark'/>
                        </div>
                        }
                        <Waypoint
                            scrollableAncestor={window}
                            onEnter={(): void => {
                                this.getMoreFollowers();
                            }}
                        />
                    </div>
                </div>
            </Container>
        );
    }

    private getParamForSubscribers = (): string => this.props.path.includes('following') ? 'following' : 'followers';
}
