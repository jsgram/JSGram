import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Spinner } from 'reactstrap';
import { followUser } from '../../store/profile/actions';
import { getRecommendations } from '../../store/newsFeed/actions';
import { IUser, IFriendsRecommendation } from '../FriendsRecommendations';
import Menu from '../Menu';
import noAvatar from '../../assets/noAvatar.png';

interface IProps {
    friendsRecommendations: IFriendsRecommendation;
    getRecommendations: () => void;
    followUser: (body: {_id: string }) => void;
}

class FriendsRecommendationsList extends React.Component <IProps> {

    public componentDidMount(): void {
        this.props.getRecommendations();
    }

    public render(): JSX.Element {

        const { friendsRecommendations: { users, loading } }: IProps = this.props;
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
                                <Button className='align-self-center' color='danger'
                                    onClick={(e: any): void => {
                                        this.props.followUser({_id: user._id});
                                        e.target.disabled = true;
                                    }}>Follow</Button>
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
    followUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRecommendationsList);
