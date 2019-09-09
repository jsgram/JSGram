import React from 'react';
import { connect } from 'react-redux';
import {
    getNewsFeedAsync,
    getMoreNewsFeedAsync,
} from '../../store/newsFeed/actions';
import { addLike, checkUserLikeExist, deleteLike, setCountOfLikes } from '../../store/like/actions';
import FeedPost from '../../components/FeedPost';
import Menu from '../../components/Menu';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import noAvatar from '../../assets/noAvatar.svg';
import { INewsFeed } from '../../store/newsFeed/reducers';
import { IPost } from '../../store/post/reducers';

interface IBody {
    userId: string;
    postId: string;
}

interface IProps {
    userPosts: any;
    user: any;
    getNewsFeedAsync: () => void;
    getMoreNewsFeedAsync: (page: number) => void;
    addLike: (body: IBody) => void;
    setCountOfLikes: (countOfLikes: number) => void;
    deleteLike: (body: IBody) => void;
    countOfLikes: number;
    likeExist: boolean;
    checkUserLikeExist: (doesExist: boolean) => void;
    addNextPosts: (pageNumber: number) => void;
    loggedUsername: string;
}

class FeedContainer extends React.Component<IProps> {
    public render(): JSX.Element {
        const {userPosts, user, loggedUsername}: any = this.props;
        return (
            <Container>
                <Menu/>
                <Row>
                    <Col sm={8} className='order-2 order-sm-1'>
                        {userPosts.posts.map((feed: IPost) => (
                            <FeedPost
                                key={feed._id}
                                author={feed.author}
                                image={feed.imgPath}
                                description={feed.description}
                                userPosts={userPosts}
                                user={user}
                                getNewsFeedAsync={this.props.getNewsFeedAsync}
                                getMoreNewsFeedAsync={this.props.getMoreNewsFeedAsync}
                                addLike={this.props.addLike}
                                setCountOfLikes={this.props.setCountOfLikes}
                                deleteLike={this.props.deleteLike}
                                countOfLikes={this.props.countOfLikes}
                                likeExist={this.props.likeExist}
                                checkUserLikeExist={this.props.checkUserLikeExist}
                            />
                        ))}
                    </Col>
                    <Col sm={4} className='order-1 order-sm-2 text-sm-center'>
                        <img
                            src={noAvatar}
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
    userPosts: state.userPosts,
    user: state.profile.user,
    countOfLikes: state.like.countOfLikes,
    likeExist: state.like.likeExist,
});

const mapDispatchToProps = {
    getNewsFeedAsync,
    getMoreNewsFeedAsync,
    setCountOfLikes,
    addLike,
    checkUserLikeExist,
    deleteLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
