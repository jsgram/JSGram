import React from 'react';
import '../../styles/style.scss';
import '../Post/style.scss';
import noAvatar from '../../assets/noAvatar.png';
import { Link } from 'react-router-dom';
import { formatDescription } from '../../helpers/regex.description';
import FeedLikesContainer from '../../containers/FeedLikesContainer';
import Menu from '../Menu';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { Waypoint } from 'react-waypoint';
import Comment from '../Comments';
import WriteComment from '../WriteComment';
import { IFeedState, INewsFeed } from '../../store/likesList/reducers';

interface IProps {
    likeList: IFeedState;
    getLikeListAsync: () => void;
    getMoreLikeListAsync: (page: number) => void;
    addNextLikeList: (pageNumber: number) => void;
    headerText: string;
}

export class LikeList extends React.Component<IProps> {
    public componentDidMount(): void {
        this.props.getLikeListAsync();
    }

    public getMoreLikeList = (): void => {
        if (!this.props.likeList.feedLoaded) {
            this.props.addNextLikeList(this.props.likeList.page);
            this.props.getMoreLikeListAsync(this.props.likeList.page);
        }
    }

    public render(): JSX.Element {
        const {likeList, headerText}: IProps = this.props;
        return (
            <Container>
                <Menu/>
                <Row className='d-flex justify-content-center'>
                    <Col sm={6} md={6}>
                        <h3 className='font-weight-light text-secondary text-uppercase text-center mb-4'>
                            {headerText}
                        </h3>
                        {
                            likeList.feed.map((feed: INewsFeed) => {
                                const {
                                    _id,
                                    authorsOfLike,
                                    description,
                                    imgPath,
                                    author: {photoPath, username}}: any = feed;
                                const authorId = feed.author._id;
                                return (
                                    <div className='profile-post border mb-5' key={_id}>
                                        <div className='post-header p-2'>
                                            <div className='d-flex flex-row'>
                                                <img
                                                    src={photoPath || noAvatar}
                                                    alt='avatar'
                                                    width={32}
                                                    height={32}
                                                    className='img-fluid rounded-circle'
                                                />
                                                <Link
                                                    to={`/profile/${username}`}
                                                    className='text-dark ml-2 mt-1 interaction'>
                                                    {username}
                                                </Link>
                                            </div>
                                        </div>
                                        <img
                                            src={imgPath}
                                            className='w-100 img-fluid'
                                            alt='post'
                                        />
                                        <div className='d-block mt-3 mb-2 pl-3'>
                                            <FeedLikesContainer
                                                postId={_id}
                                                likes={authorsOfLike}
                                                authorId={authorId}
                                            />
                                        </div>
                                        <div className='description-post pb-3 border-bottom'>
                                            <div className='d-block pl-3 text-description'>
                                                <img
                                                    src={photoPath || noAvatar}
                                                    alt='avatar'
                                                    width={32}
                                                    height={32}
                                                    className='img-fluid rounded-circle'
                                                />
                                                <Link
                                                    to={`/profile/${username}`}
                                                    className='d-inline-block text-dark ml-2 interaction'
                                                >
                                                    {username}
                                                </Link>
                                                <p className='pl-2 mt-2 justify-self-start align-self-start'>
                                                    {formatDescription(description)}
                                                </p>
                                            </div>
                                        </div>
                                        <Comment postId={_id}/>
                                        <WriteComment
                                            postId={_id}
                                            authorId={authorId}
                                        />
                                    </div>
                                );
                            })
                        }
                    </Col>
                </Row>

                <Waypoint
                    scrollableAncestor={window}
                    onEnter={(): void => {
                        this.getMoreLikeList();
                    }}
                />
                <div className='w-100 d-flex align-items-center justify-content-center'>
                    {likeList.feedLoading && <Spinner className='mt-3' color='dark'/>}
                </div>
            </Container>
        );
    }
}
