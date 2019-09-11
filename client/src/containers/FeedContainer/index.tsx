import React from 'react';
import { connect } from 'react-redux';
import * as newsFeedAction from '../../store/newsFeed/actions';
import * as addPostLike from '../../store/post/actions';
import FeedPost from '../../components/FeedPost';
import Menu from '../../components/Menu';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import noAvatar from '../../assets/noAvatar.png';
import { INewsFeed } from '../../store/newsFeed/reducers';
import { Waypoint } from 'react-waypoint';

class FeedContainer extends React.Component<any> {

    public getMoreFeedPosts = (): void => {
        if (!this.props.newsFeed.loaded) {
            this.props.getMoreNewsFeedAsync(this.props.newsFeed.page);
            this.props.addNextFeedPosts(this.props.newsFeed.page + 1);
        }
    }

    public componentDidMount(): void {
        this.props.getNewsFeedAsync();
    }
    // TODO refactor props
    public render(): JSX.Element {
        const {newsFeed, user, loggedUsername, loggedId,
            getNewsFeedAsync, getMoreNewsFeedAsync, addNextFeedPosts,
            addLike, setCountOfLikes, deleteLike,
            checkUserLikeExist, addLoggedUserLike, removeLoggedUserLike,
        }: any = this.props;

        return (
            <Container>
                <Menu/>
                <Row>
                    <Col sm={8} className='order-2 order-sm-1'>
                        {
                            newsFeed.feed.map((feed: INewsFeed) => {
                                const likeExist = feed.authorsOfLike.includes(loggedId);
                                return (<FeedPost
                                    key={feed._id}
                                    id={feed._id}
                                    newsFeed={newsFeed}
                                    author={feed.author}
                                    authorsOfLike={feed.authorsOfLike}
                                    image={feed.imgPath}
                                    description={feed.description}
                                    user={user}
                                    getNewsFeedAsync={getNewsFeedAsync}
                                    getMoreNewsFeedAsync={getMoreNewsFeedAsync}
                                    addLike={addLike}
                                    setCountOfLikes={setCountOfLikes}
                                    deleteLike={deleteLike}
                                    likeExist={likeExist}
                                    checkUserLikeExist={checkUserLikeExist}
                                    addLoggedUserLike={addLoggedUserLike}
                                    removeLoggedUserLike={removeLoggedUserLike}
                                    addNextFeedPosts={addNextFeedPosts}
                                    loggedId={loggedId}
                                    loggedUsername={loggedUsername}
                                />);
                            })
                        }
                    </Col>
                    <Col sm={4} className='order-1 order-sm-2 text-sm-center'>
                        <img
                            src={user.photo || noAvatar}
                            alt='avatar'
                            width={64}
                            height={64}
                            className='img-fluid rounded-circle'
                        />
                        <Link to={`/profile/${loggedUsername}`} className='mt-1 ml-3 mr-4
                        text-dark'>{loggedUsername}</Link>
                        <Link to='/logout' className='text-danger pl-1'>Logout</Link>
                    </Col>
                </Row>
                <Waypoint
                    scrollableAncestor={window}
                    onEnter={(): void => {
                        this.getMoreFeedPosts();
                    }}
                />
                <div className='w-100 d-flex align-items-center justify-content-center'>
                    { this.props.newsFeed.loading && <Spinner className='mt-3' color='dark'/>}
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: any): any => ({
    newsFeed: state.newsFeed,
    user: state.profile.user,
    author: state.author,
    image: state.image,
    description: state.description,
    likeExist: state.userPosts.likeExist,
    loggedId: state.feed.loggedId,
    loggedUsername: state.feed.loggedUsername,
    });

const mapDispatchToProps = {
    getNewsFeedAsync: newsFeedAction.getNewsFeedAsync,
    getMoreNewsFeedAsync: newsFeedAction.getMoreNewsFeedAsync,
    addNextFeedPosts: newsFeedAction.addNextFeedPosts,
    addLike: addPostLike.addLike,
    checkUserLikeExist: addPostLike.checkUserLikeExist,
    deleteLike: addPostLike.deleteLike,
    setCountOfLikes: addPostLike.setCountOfLikes,
    addLoggedUserLike: addPostLike.addLoggedUserLike,
    removeLoggedUserLike: addPostLike.removeLoggedUserLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
