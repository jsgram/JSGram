import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Button, Spinner } from 'reactstrap';

export interface IFollowersProps {
    followers: [];
    urlUsername: string;
    page: number;
    loggedId: string;
    allFollowersLoaded: boolean;
    loadFollow: boolean;
    followUser: (body: { _id: string }) => void;
    unfollowUser: (body: { _id: string }) => void;
    getFollowers: (loggedId: string, urlUsername: string) => void;
    setNextPage: (page: number) => void;
    getMoreFollowers: (loggedId: string, urlUsername: string, page: number) => void;
    changeUserFollowing: (_id: string) => void;
}

export class Followers extends React.Component<IFollowersProps> {
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

    public dynamicButton = (_id: string, alreadyFollow: boolean): any => {
        const followSubscriber = (): void => {
            const body = {_id};
            this.props.followUser(body);
            this.props.changeUserFollowing(_id);
        };

        const unfollowSubscriber = (): void => {
            const body = {_id};
            this.props.unfollowUser(body);
            this.props.changeUserFollowing(_id);
        };

        if (this.props.loadFollow) {
            return <span><Spinner color='light'/></span>;
        }

        if (alreadyFollow) {
            return (
                <span onClick={unfollowSubscriber}>
                        <Button className='btn' color='danger'><i
                            className=''
                        />
                            Unfollow
                        </Button>
                    </span>
            );
        }

        return (
            <span onClick={followSubscriber}>
                            <Button className='btn' color='danger'><i
                                className=''
                            />
                                Follow back
                            </Button>
                        </span>
        );
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.props.followers.map((follower: any) =>
                    <div key={follower._id}>
                        <h1>{follower.username}</h1>
                        <img src={follower.photoPath} width='50px' height='50px' alt=''/>
                        <h3>{follower.follow}</h3>
                        {this.dynamicButton(follower._id, follower.alreadyFollow)}
                    </div>,
                )}
                <Waypoint
                    scrollableAncestor={window}
                    onEnter={(): void => {
                        this.getMoreFollowers();
                    }}
                />
            </div>
        );
    }
}
