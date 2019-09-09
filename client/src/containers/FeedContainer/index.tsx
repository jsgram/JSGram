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

interface IProps {
    loggedUsername: string;
}

class FeedContainer extends React.Component<any> {

    public posts: any = [
        {id: 2, author: 'archi2', image: 'https://picsum.photos/500', description: 'test test2'},
        {id: 1, author: 'archi1', image: 'https://picsum.photos/500', description: 'test test1'},
        {id: 3, author: 'archi3', image: 'https://picsum.photos/500', description: 'test test3'},
        {id: 4, author: 'archi4', image: 'https://picsum.photos/500', description: 'test test4'},
    ];

    public render(): JSX.Element {
        const {loggedUsername}: any = this.props;
        return (
            <Container>
                <Menu/>
                <Row>
                    <Col sm={8} className='order-2 order-sm-1'>
                        {/*{this.posts.map((post: any) => (*/}
                        {/*    <FeedPost*/}
                        {/*        key={post.id}*/}
                        {/*        author={post.author}*/}
                        {/*        image={post.image}*/}
                        {/*        description={post.description}*/}
                        {/*    />*/}
                        {/*))}*/}
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
                <FeedPost
                    userPosts={this.props.userPosts}
                    user={this.props.user}
                    getNewsFeedAsync={this.props.getNewsFeedAsync}
                    getMoreNewsFeedAsync={this.props.getMoreNewsFeedAsync}
                    addLike={this.props.addLike}
                    setCountOfLikes={this.props.setCountOfLikes}
                    deleteLike={this.props.deleteLike}
                    countOfLikes={this.props.countOfLikes}
                    likeExist={this.props.likeExist}
                    checkUserLikeExist={this.props.checkUserLikeExist}
                />
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
