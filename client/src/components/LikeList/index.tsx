import React, { ReactElement } from 'react';
import '../../styles/style.scss';
import '../Post/style.scss';
import noAvatar from '../../assets/noAvatar.png';
import { Link } from 'react-router-dom';
import { formatDescription } from '../../helpers/regex.description';
import FeedLikesContainer from '../../containers/FeedLikesContainer';
import Menu from '../Menu';
import { Col, Container, Row } from 'reactstrap';
import Comment from '../Comments';
import WriteComment from '../WriteComment';

interface IFeed {
    _id: string;
    description: string;
    authorsOfLike: string[];
    imgPath: string;
    author: {
        username: string;
        photoPath: string;
    };
}

const likeList = [
    {
        _id: '5d701d55fab4df1cf156c322',
        description: 'Hello, Donald!',
        imgPath: 'https://cdn.pixabay.com/photo/2019/08/19/07/45/pets-4415649_960_720.jpg',
        author: {
            photoPath: 'https://jsgram-profile-images1.s3.eu-central-1.amazonaws.com/1569856788926',
            username: 'Stepan',
        },
        authorsOfLike: [
            '5d92003d5205831fd033c43v',
            '5d92003d5205831fd033c4fv',
        ],
    },
    {
        _id: '5d7ff4b0d46be8373cbb3d22',
        description: 'Hello, Stepan!',
        imgPath: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/dog-190056_960_720.jpg',
        author: {
            photoPath: 'https://jsgram-profile-images1.s3.eu-central-1.amazonaws.com/1569856788926',
            username: 'Donald',
        },
        authorsOfLike: [
            '5d92003d5205831fd033c43g',
        ],
    },
    {
        _id: '5d813b3b5d16b939403fa722',
        description: 'Hello, guys!',
        imgPath: 'https://cdn.pixabay.com/photo/2016/11/21/00/47/view-1844110_960_720.jpg',
        author: {
            photoPath: 'https://jsgram-profile-images1.s3.eu-central-1.amazonaws.com/1569856788926',
            username: 'Jessica',
        },
        authorsOfLike: [
            '5d92003d5205831fd033c43k',
        ],
    },
];

export const LikeList = (): ReactElement => (
    <Container>
        <Menu />
        <Row className='d-flex justify-content-center'>
            <Col sm={6} md={6}>
                <h3 className='font-weight-light text-secondary text-uppercase text-center mb-4'>
                    Posts You've liked
                </h3>
                {
                    likeList.map((feed: IFeed) => (
                            <div className='profile-post border mb-5' key={feed._id}>
                                <div className='post-header p-2'>
                                    <div className='d-flex flex-row'>
                                        <img
                                            src={feed.author.photoPath || noAvatar}
                                            alt='avatar'
                                            width={32}
                                            height={32}
                                            className='img-fluid rounded-circle'
                                        />
                                        <Link
                                            to={`/profile/${feed.author.username}`}
                                            className='text-dark ml-2 mt-1'>
                                            {feed.author.username}
                                        </Link>
                                    </div>
                                </div>
                                <img
                                    src={feed.imgPath}
                                    className='w-100 img-fluid'
                                    alt='post'
                                />
                                <div className='d-block mt-3 mb-2 pl-3'>
                                    <FeedLikesContainer postId={feed._id} likes={feed.authorsOfLike} />
                                </div>
                                <div className='description-post pb-3 border-bottom'>
                                    <div className='d-block pl-3 text-description'>
                                        <img
                                            src={feed.author.photoPath || noAvatar}
                                            alt='avatar'
                                            width={32}
                                            height={32}
                                            className='img-fluid rounded-circle'
                                        />
                                        <Link
                                            to={`/profile/${feed.author.username}`}
                                            className='d-inline-block text-dark ml-2'
                                        >
                                            {feed.author.username}
                                        </Link>
                                        <p className='pl-2 mt-2 justify-self-start align-self-start'>
                                            {formatDescription(feed.description)}
                                        </p>
                                    </div>
                                </div>
                                <Comment postId={feed._id} />
                                <WriteComment
                                    postId={feed._id}
                                />
                            </div>
                    ))
                }
            </Col>
        </Row>
    </Container>
);
