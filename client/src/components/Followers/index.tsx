import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Container, Button, Spinner } from 'reactstrap';
import noAvatar from '../../assets/noAvatar.png';
import './style.scss';
import Menu from '../Menu';
import { Link } from 'react-router-dom';

export interface IFollowersProps {
    title: string;
    followers: [];
    urlUsername: string;
    page: number;
    loggedId: string;
    allFollowersLoaded: boolean;
    loadFollow: boolean;
    loaded: boolean;
    loading: boolean;
    followUser: (body: { _id: string }) => void;
    unfollowUser: (body: { _id: string }) => void;
    getFollowers: (loggedId: string, urlUsername: string) => void;
    setNextPage: (page: number) => void;
    getMoreFollowers: (loggedId: string, urlUsername: string, page: number) => void;
    changeUserFollowing: (_id: string) => void;
}

export class Followers extends React.Component<IFollowersProps> {

    public componentDidMount(): void {
        this.props.getFollowers(this.props.loggedId, this.props.urlUsername);
    }

    public componentDidUpdate(prevProps: any): void {
        if (prevProps.loggedId !== this.props.loggedId) {
            this.props.getFollowers(this.props.loggedId, this.props.urlUsername);
        }
    }

    public getMoreFollowers = (): void => {
        if (!this.props.allFollowersLoaded && this.props.loggedId) {
            this.props.setNextPage(this.props.page);
            this.props.getMoreFollowers(this.props.loggedId, this.props.urlUsername, this.props.page);
        }
    }

    public followSubscriber = (_id: string): void => {
        this.props.followUser({_id});
        this.props.changeUserFollowing(_id);
    }

    public unfollowSubscriber = (_id: string): void => {
        this.props.unfollowUser({_id});
        this.props.changeUserFollowing(_id);
    }

    public dynamicButton = (_id: string, alreadyFollow: boolean): any => {
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
        return (
            <Container>
                <Menu/>
                <h4 className='text-center font-weight-light text-secondary text-uppercase'>{this.props.title}</h4>
                <div className='d-flex justify-content-center'>
                    <div className='follow-wrapper'>
                        {this.props.loading ?
                            <div className='d-flex justify-content-center'>
                                <Spinner className='mt-3' color='dark'/>
                            </div> :
                            <div>{this.props.followers.map((follower: any) =>
                                    <div className='d-flex mt-1 mb-3 justify-content-between' key={follower._id}>
                                        <div className='row'>
                                            <img
                                                src={follower.photoPath || noAvatar}
                                                alt='avatar'
                                                width={32}
                                                height={32}
                                                className='img-fluid rounded-circle ml-2 mr-2 mt-1'
                                            />
                                            <h6 className='align-self-end'>
                                                <Link
                                                    to={`/profile/${follower.username}`}
                                                    className='text-dark'>{follower.username}
                                                </Link>
                                            </h6>
                                        </div>
                                        {this.props.loggedId !== follower._id &&
                                            this.dynamicButton(follower._id, follower.alreadyFollow)}
                                    </div>,
                                )}
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
}
