import React from 'react';
import { connect } from 'react-redux';
import * as newsFeedAction from '../../store/newsFeed/actions';
import { addLike, checkUserLikeExist, deleteLike, setCountOfLikes } from '../../store/like/actions';
import FeedPost from '../../components/FeedPost';
import Menu from '../../components/Menu';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import noAvatar from '../../assets/noAvatar.svg';
import { INewsFeed } from '../../store/newsFeed/reducers';

class FeedContainer extends React.Component<any> {
    public render(): JSX.Element {
        const {newsFeed, user, loggedUsername,
            getNewsFeedAsync, getMoreNewsFeedAsync, addNextFeedPosts}: any = this.props;
        return (
            <Container>
                <Menu/>
                <Row>
                    <Col sm={8} className='order-2 order-sm-1'>
                        {newsFeed.feed.map((feed: INewsFeed) =>
                            <FeedPost
                                key={feed._id}
                                newsFeed={newsFeed}
                                author={feed.author}
                                image={feed.imgPath}
                                description={feed.description}
                                getNewsFeedAsync={getNewsFeedAsync}
                                getMoreNewsFeedAsync={getMoreNewsFeedAsync}
                                addLike={this.props.addLike}
                                setCountOfLikes={this.props.setCountOfLikes}
                                deleteLike={this.props.deleteLike}
                                countOfLikes={this.props.countOfLikes}
                                likeExist={this.props.likeExist}
                                checkUserLikeExist={this.props.checkUserLikeExist}
                                addNextFeedPosts={addNextFeedPosts}
                                loggedUsername={loggedUsername}
                            />,
                            )}
                    </Col>
                    <Col sm={4} className='order-1 order-sm-2 text-sm-center'>
                        <img
                            src={user.photo || noAvatar}
                            alt='avatar'
                            width={64}
                            height={64}
                            className='img-fluid rounded-circle'
                        />
                        <Link to={`/profile/${loggedUsername}`} className='mt-1 ml-3 text-dark'>{loggedUsername}</Link>
                    </Col>
                </Row>
                <Link to='/logout' className='text-danger pl-1'>Logout</Link>
            </Container>
        );
    }
}

const mapStateToProps = (state: any): any => ({
    newsFeed: state.newsFeed,
    user: state.profile.user,
    countOfLikes: state.like.countOfLikes,
    likeExist: state.like.likeExist,
    author: state.author,
    image: state.image,
    description: state.description,
});

const mapDispatchToProps = {
    getNewsFeedAsync: newsFeedAction.getNewsFeedAsync,
    getMoreNewsFeedAsync: newsFeedAction.getMoreNewsFeedAsync,
    setCountOfLikes,
    addLike,
    checkUserLikeExist,
    deleteLike,
    addNextFeedPosts: newsFeedAction.addNextFeedPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
