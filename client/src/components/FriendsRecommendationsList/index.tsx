import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button} from 'reactstrap';
import { changeUsersFollowing } from '../../store/newsFeed/actions';
import { getRecommendations } from '../../store/newsFeed/actions';
import { IUser, IFriendsRecommendation } from '../FriendsRecommendations';
import Menu from '../Menu';
import noAvatar from '../../assets/noAvatar.png';

interface IProps {
    friendsRecommendations: IFriendsRecommendation;
    getRecommendations: () => void;
    changeUsersFollowing: (_id: string, followType: string) => void;
}

export class FriendsRecommendationsList extends React.Component <IProps> {

    public componentDidMount(): void {
        this.props.getRecommendations();
    }

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

        const { friendsRecommendations: { users } }: IProps = this.props;

        return (
            <Container>
                <Menu/>
                <div className='d-flex justify-content-center'>
                    <div className='follow-wrapper'>
                        <h4 className='text-center font-weight-light text-secondary text-uppercase'>
                            Recommendations:</h4>
                        {users.map((user: IUser) =>
                            <div className='d-flex mt-1 mb-3 justify-content-between' key={user._id}>
                                <div className='row'>
                                    <img
                                        src={user.photoPath || noAvatar}
                                        alt='avatar'
                                        width={32}
                                        height={32}
                                        className='img-fluid rounded-circle ml-2 mr-2 mt-1'
                                    />
                                    <h6 className='align-self-end'>
                                    <Link to={`/profile/${user.username}`}
                                          className='text-dark'>{user.username}</Link>
                                    </h6>
                                </div>
                                    {this.dynamicButton(user._id, user.isAlreadyFollow)}
                            </div>,
                        )}
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: any): any => ({
    friendsRecommendations: state.newsFeed.friendsRecommendations,
});

const mapDispatchToProps = {
    getRecommendations,
    changeUsersFollowing,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRecommendationsList);
