import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import noAvatar from '../../assets/noAvatar.png';

export interface IUser {
    photoPath: string;
    _id: string;
    username: string;
    isAlreadyFollow: boolean;
}

export interface IFriendsRecommendation {
    users: IUser[];
    loading: boolean;
}

interface IProps {
    loggedUsername: string;
    friendsRecommendations: IFriendsRecommendation;
    changeUsersFollowing: (id: string, followType: string) => void;
}

export class FriendsRecomendations extends React.Component <IProps> {

    public followRecommendationUser = (_id: string): void => {
        this.props.changeUsersFollowing(_id, 'follow');
    }

    public unfollowRecommendationUser = (_id: string): void => {
        this.props.changeUsersFollowing(_id, 'unFollow');
    }

    public dynamicButton = (_id: string, isAlreadyFollow: boolean): JSX.Element => {

        if (isAlreadyFollow) {
            return (
                <span onClick={(): any => this.unfollowRecommendationUser(_id)}>
                        <Button className='btn' color='danger'>
                            Unfollow
                        </Button>
                    </span>
            );
        }

        return (
            <span onClick={(): any => this.followRecommendationUser(_id)}>
                            <Button className='btn' color='danger'>
                                Follow
                            </Button>
                        </span>
        );
    }

    public render(): JSX.Element {
        const USERS_PER_PAGE = 4;
        const topRecommendations = this.props.friendsRecommendations.users.slice(0, USERS_PER_PAGE);
        return (
        <div className='mt-5'>
            <h4 className='text-center'>Suggestions for you:</h4>
            {topRecommendations.map((user: IUser) => (
                    <div className='d-flex justify-content-between mb-2' key={user._id}>
                        <div>
                            <Link to={`/profile/${user.username}`}>
                                <img
                                    src={user.photoPath || noAvatar}
                                    alt='avatar'
                                    width={64}
                                    height={64}
                                    className='img-fluid rounded-circle'
                                /></Link>
                                <Link to={`/profile/${user.username}`} className='mt-1 ml-3 mr-4
                                  text-dark'>{user.username.length > 10 ?
                                            `${user.username.substring(0, 10)}...` : user.username}</Link>
                            </div>
                            {this.dynamicButton(user._id, user.isAlreadyFollow)}
                    </div>
                ),
            )}
            {this.props.friendsRecommendations.users.length > topRecommendations.length &&
            <Link to={`/profile/${this.props.loggedUsername}/recommendations`} className='mr-2 text-decoration-none'>
                See all recommendations</Link>}
        </div>
        );
    }
}
