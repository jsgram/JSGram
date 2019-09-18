import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import noAvatar from '../../assets/noAvatar.png';

export interface IUser {
    photoPath: string;
    _id: string;
    username: string;
}

export interface IFriendsRecommendation {
    users: IUser[];
    loading: boolean;
}

interface IProps {
    loggedUsername: string;
    friendsRecommendations: IFriendsRecommendation;
    followUser: (body: {_id: string}) => void;
}

export const FriendsRecomendations = ({loggedUsername, friendsRecommendations, followUser}: IProps): JSX.Element => {
    const USERS_PER_PAGE = 4;
    const topRecommendations = friendsRecommendations.users.slice(0, USERS_PER_PAGE);

    return (
        <div className='mt-5'>
            <h4 className='text-center'>Suggestions for you:</h4>
            {topRecommendations.map((user: IUser) => (
                        <div className='d-flex justify-content-between mb-2' key={user._id}>
                            <div className='wrapper'>
                            <Link to={`/profile/${user.username}`}>
                                <img
                            src={user.photoPath || noAvatar}
                            alt='avatar'
                            width={64}
                            height={64}
                            className='img-fluid rounded-circle'
                        /></Link>
                        <Link to={`/profile/${user.username}`} className='mt-1 ml-3 mr-4
                                  text-dark'>{user.username}</Link>
                        </div>
                        <Button className='align-self-center' color='danger'
                                onClick={(e: any): void => {
                                    followUser({_id: user._id});
                                    e.target.disabled = true;
                                }}>Follow</Button>
                        </div>
                ),
            )}
            {friendsRecommendations.users.length > topRecommendations.length &&
                <Link to={`/profile/${loggedUsername}/recommendations`} className='mr-2 text-decoration-none'>
                        See all recommendations</Link>}
      </div>
    );
};
