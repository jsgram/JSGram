import React from 'react';
import '../../styles/style.scss';
import '../Post/style.scss';
import noAvatar from '../../assets/noAvatar.png';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { formatDescription } from '../../helpers/regex.description';
import FeedLikesContainer from '../../containers/FeedLikesContainer';
import Menu from '../Menu';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { INewsFeed } from '../../store/newsFeed/reducers';
import { Waypoint } from 'react-waypoint';
import Comment from '../Comments';

interface IProps {
    loggedId: string;
    loggedUsername: string;
    loggedPhotoPath: string;
    newsFeed: any;
    getNewsFeedAsync: () => void;
    getMoreNewsFeedAsync: (page: number) => void;
    addNextFeedPosts: (pageNumber: number) => void;
}

export class FeedPost extends React.Component<IProps> {
    public state: { loaded: boolean} = {
        loaded: false,
    };
    public timerHandle: any = 0;

    public componentDidUpdate(): void {
        if (!this.props.getNewsFeedAsync.length) {
            this.timerHandle = setTimeout(() => {
                this.setState({loaded: true});
                this.timerHandle = 0;
            },
                800,
            );
        }
    }

    public componentDidMount(): void {
        this.props.getNewsFeedAsync();
    }

    public getMoreFeedPosts = (): void => {
        if (!this.props.newsFeed.feedLoaded) {
            this.props.addNextFeedPosts(this.props.newsFeed.page);
            this.props.getMoreNewsFeedAsync(this.props.newsFeed.page);
        }
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timerHandle);
        this.timerHandle = 0;
    }

    public render(): JSX.Element {
        const {loggedUsername, loggedPhotoPath, newsFeed}: any = this.props;
        const {loaded}: { loaded: boolean } = this.state;

        if (!loaded) {
            return (
                <div className='w-100 flex-grow-1 d-flex align-items-center justify-content-center'>
                    <Spinner className='mt-3' color='dark'/>
                </div>
            );
        }
        return (
            <Container>
                <Menu/>
                <Row>
                    <Col sm={8} className='order-2 order-sm-1'>
                        {
                            newsFeed.feed.map((feed: INewsFeed) => {
                                const {description, imgPath, author: {photoPath, username}}: any = feed;
                                return (
                                    <div className='profile-post border mb-5' key={feed._id}>
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
                                                    className='text-dark mt-1 ml-3'>
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
                                            <FeedLikesContainer postId={feed._id} likes={feed.authorsOfLike}/>
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
                                                    className='d-inline-block text-dark ml-2'
                                                >
                                                    {username}
                                                </Link>
                                                <p className='pl-2 mt-2 justify-self-start align-self-start'>
                                                    {formatDescription(description)}
                                                </p>
                                            </div>
                                        </div>
                                        <Comment postId={feed._id}/>
                                        <div className='mt-3 px-2 d-flex'>
                                            <TextareaAutosize
                                                className='add-comment flex-grow-1 border-0 p-2'
                                                placeholder='Write your comment...'
                                                autoComplete='off'
                                                minRows={1}
                                                maxRows={4}
                                            />
                                            <button
                                                className='button-comment p-0 border-0 mr-lg-2 mr-3 col-3'
                                                type='submit'
                                                disabled
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Col>
                    <Col sm={4} className='order-1 order-sm-2 text-sm-center'>
                        <img
                            src={loggedPhotoPath || noAvatar}
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
                    {this.props.newsFeed.feedLoading && <Spinner className='mt-3' color='dark'/>}
                </div>
            </Container>
        );
    }
}
