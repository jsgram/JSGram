import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Button, Spinner } from 'reactstrap';

export interface IFollowingProps {
    following: [];
    urlUsername: string;
    page: number;
    loggedId: string;
    allFollowingLoaded: boolean;
    loadFollow: boolean;
    followUser: (body: { _id: string }) => void;
    unfollowUser: (body: { _id: string }) => void;
    getFollowing: (loggedId: string, urlUsername: string) => void;
    setNextPage: (page: number) => void;
    getMoreFollowings: (loggedId: string, urlUsername: string, page: number) => void;
}

export class Followings extends React.Component<IFollowingProps> {
    public componentDidUpdate(prevProps: any): void {
        if (prevProps.loggedId !== this.props.loggedId) {
            this.props.getFollowing(this.props.loggedId, this.props.urlUsername);
        }
    }

    public getMoreFollowings = (): void => {
        if (!this.props.allFollowingLoaded && this.props.loggedId) {
            this.props.setNextPage(this.props.page);
            this.props.getMoreFollowings(this.props.loggedId, this.props.urlUsername, this.props.page);
        }
    }

    public dynamicButton = (_id: string, alreadyFollow: boolean): any => {
        const followSubscriber = (): void => {
            const body = {_id};
            this.props.followUser(body);
        };

        const unfollowSubscriber = (): void => {
            const body = {_id};
            this.props.unfollowUser(body);
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
                {this.props.following.map((following: any) =>
                    <div key={following._id}>
                        <h1>{following.username}</h1>
                        <img src={following.photoPath} width='50px' height='50px' alt=''/>
                        <h3>{following.follow}</h3>
                        {this.dynamicButton(following._id, following.alreadyFollow)}
                    </div>,
                )}
                <Waypoint
                    scrollableAncestor={window}
                    onEnter={(): void => {
                        this.getMoreFollowings();
                    }}
                />
            </div>
        );
    }
}
