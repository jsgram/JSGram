import React from 'react';
import '../../styles/style.scss';
import '../Post/style.scss';
import noAvatar from '../../assets/noAvatar.png';
import { Link } from 'react-router-dom';
import { formatDescription } from '../../helpers/regex.description';
import FeedLikesContainer from '../../containers/FeedLikesContainer';
import Menu from '../Menu';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { INewsFeed } from '../../store/newsFeed/reducers';
import { Waypoint } from 'react-waypoint';
import Comment from '../Comments';
import { FriendsRecomendations } from '../FriendsRecommendations';
import WriteComment from '../WriteComment';

interface IProps {
    loggedId: string;
    loggedUsername: string;
    loggedPhotoPath: string;
    newsFeed: any;
    getPostsByTagAsync: (tagName: string) => void;
    getMorePostsByTagAsync: (tagName: string, page: number) => void;
    addNextFeedPosts: (pageNumber: number) => void;
    getRecommendations: () => void;
    changeUsersFollowing: (id: string, followType: string) => void;
    friendsRecommendations: any;
    match: any;
}

export default class PostByTag extends React.Component<IProps> {
    public componentDidMount(): void {
        this.props.getPostsByTagAsync(this.props.match.params.tagName);
        this.props.getRecommendations();
    }

    public getMoreFeedPosts = (): void => {
        if (!this.props.newsFeed.feedLoaded) {
            this.props.addNextFeedPosts(this.props.newsFeed.page);
            this.props.getMorePostsByTagAsync(this.props.match.params.tagName, this.props.newsFeed.page);
        }
    }

    public render(): JSX.Element {
        const {loggedUsername, loggedPhotoPath, newsFeed, changeUsersFollowing}: any = this.props;

        return (
            <Container>
                <Menu/>
                <Row>
                    <Col sm={7} md={8} className='order-2 order-sm-1'>
                        <h4 className='text-muted text-center mb-3'>Posts with #{this.props.match.params.tagName}:</h4>
                        {
                            newsFeed.feed.map((feed: INewsFeed) => {
                                const {description, imgPath, author: {_id, photoPath, username}}: any = feed;
                                return (
                                    <div key={feed._id} className='profile-post border mb-5'>
                                        <div className='post-header p-2 border'>
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
                                                    className='text-dark mt-1 ml-3 interaction'>
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
                                                postId={feed._id}
                                                likes={feed.authorsOfLike}
                                                authorId={_id}
                                            />
                                        </div>
                                        <div className='description-post pb-3'>
                                            <div className='d-block pl-3 text-description'>
                                                <img
                                                    src={photoPath || noAvatar}
                                                    alt='avatar'
                                                    width={32}
                                                    height={32}
                                                    className='img-fluid rounded-circle interaction'
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
                                        <Comment postId={feed._id}/>
                                        <div className='border-top pb-2'/>
                                        <WriteComment
                                            postId={feed._id}
                                            authorId={_id}
                                        />
                                    </div>
                                );
                            })
                        }
                    </Col>
                    <Col sm={5} md={4} className='order-1 order-sm-2 text-center'>
                        <div className='sticky-top'>
                            <img
                                src={loggedPhotoPath || noAvatar}
                                alt='avatar'
                                width={64}
                                height={64}
                                className='img-fluid rounded-circle'
                            />
                            <Link to={`/profile/${loggedUsername}`} className='mt-1 ml-3 mr-4 text-dark interaction'>
                                {loggedUsername}
                            </Link>
                            <Link to='/logout' className='text-danger pl-1'>Logout</Link>
                            {!!newsFeed.friendsRecommendations.users.length &&
                            <FriendsRecomendations
                                loggedUsername={loggedUsername}
                                friendsRecommendations={newsFeed.friendsRecommendations}
                                changeUsersFollowing={changeUsersFollowing}
                            />}
                        </div>
                    </Col>
                </Row>

                <Waypoint
                    scrollableAncestor={window}
                    onEnter={(): void => {
                        this.getMoreFeedPosts();
                    }}
                />
                <div className='w-100 d-flex align-items-center justify-content-center'>
                    {this.props.newsFeed.feedLoading && <Spinner className='mt-3' color='dark'/>}
                </div>
            </Container>
        );
    }
}
