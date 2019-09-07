import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {IState} from '../../store/feed/reducers';
import Menu from '../Menu';
import FeedPost from '../FeedPost';
import noAvatar from '../../assets/noAvatar.svg';

interface IProps {
    loggedUsername: string;
}

export class Feed extends React.Component<IProps> {

    public posts: any = [
        {id: 2, author: 'archi2', image: 'https://picsum.photos/500', description: 'test test2'},
        {id: 1, author: 'archi1', image: 'https://picsum.photos/500', description: 'test test1'},
        {id: 3, author: 'archi3', image: 'https://picsum.photos/500', description: 'test test3'},
        {id: 4, author: 'archi4', image: 'https://picsum.photos/500', description: 'test test4'},
    ];

    public render(): JSX.Element {
        const {loggedUsername}: IProps = this.props;
        return (
            <Container>
                <Menu/>
                <Row>
                    <Col sm={8} className='order-2 order-sm-1'>
                        {this.posts.map((post: any) => (
                            <FeedPost
                                key={post.id}
                                author={post.author}
                                image={post.image}
                                description={post.description}
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
                        <Link to='/profile/zennarchi' className='mt-1 ml-3 text-dark'>zennarchi</Link>
                    </Col>
                </Row>
                <Link to='/logout' className='text-danger pl-1'>Logout</Link>
            </Container>
        );
    }
}
