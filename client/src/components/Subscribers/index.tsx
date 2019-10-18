import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Container, Button, Spinner } from 'reactstrap';
import noAvatar from '../../assets/noAvatar.png';
import './style.scss';
import Menu from '../Menu';
import { Link } from 'react-router-dom';
import { IUserData } from '../Profile';
import { FOLLOW_NOTIFICATION } from '../../store/notifications/notificationsConfig';

export interface ISubscribersProps {
    path: any;
    loggedId: string;
    loggedUsername: string;
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
    getSubscribers: (loggedId: string, subscribers: string, urlUsername: string, page: number) => void;
    setSubscribersCount: (followersCount: number, followingCount: number) => void;
    changeUserFollowing: (_id: string, followType: string) => void;
    resetSubscribers: () => void;
    emitNewNotificationSocket: (userId: string, loggedUsername: string, message: string) => void;
}

export class Subscribers extends React.Component<ISubscribersProps> {
    public componentDidMount(): void {
        this.props.getUser(this.props.urlUsername);
    }

    public componentDidUpdate(prevProps: any): void {
        if (prevProps.user !== this.props.user) {
            const {followers, following}: IUserData = this.props.user;
            this.props.setSubscribersCount(
                followers.length,
                following.length,
            );
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
        this.props.emitNewNotificationSocket(_id, this.props.loggedUsername, FOLLOW_NOTIFICATION);
    }

    public unfollowSubscriber = (_id: string): void => {
        this.props.changeUserFollowing(_id, 'unFollow');
    }

    public dynamicButton = (_id: string, alreadyFollow: boolean): JSX.Element => {
        if (this.props.loadFollow) {
            return <Spinner color='light'/>;
        }

        if (alreadyFollow) {
            return (
                <Button className='btn interaction' color='danger' onClick={(): any => this.unfollowSubscriber(_id)}>
                    Unfollow
                </Button>
            );
        }

        return (
            <Button className='btn interaction' color='danger' onClick={(): any => this.followSubscriber(_id)}>
                Follow
            </Button>
        );
    }

    public createLink = (subscriber: boolean, count: number, followType: string): JSX.Element => {
        return (
            <Link to={`/profile/${this.props.urlUsername}/${followType}`} className='link-style interaction'
                style={{textDecoration: !subscriber ? 'underline' : 'none'}}
            >
                <h4
                    className='font-weight-light text-secondary text-uppercase'
                >
                    {count} {followType}
                </h4>
            </Link>
        );
    }

    public render(): JSX.Element {
        const {path, loading, followersCount, followingCount, loggedId, subscribers}: ISubscribersProps = this.props;
        const pathSubscribers = path.includes('following');

        return (
            <Container>
                <Menu/>
                {loading ?
                    (
                        <div className='d-flex justify-content-center'>
                            <Spinner className='mt-3' color='white'/>
                        </div>
                    ) :
                    (
                        <div className='d-flex justify-content-center'>
                            {this.createLink(pathSubscribers, followersCount, 'followers')}
                            {this.createLink(!pathSubscribers, followingCount, 'following')}
                        </div>
                    )
                }
                <div className='d-flex justify-content-center'>
                    <div className='follow-wrapper'>
                        {loggedId &&
                        <div>{subscribers.map((subscriber: any) =>
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
                                            className='text-dark interaction'>{subscriber.username}
                                        </Link>
                                    </h6>
                                </div>
                                {loggedId !== subscriber._id &&
                                this.dynamicButton(subscriber._id, subscriber.alreadyFollow)}
                            </div>,
                        )}
                        </div>
                        }
                        {loading &&
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
