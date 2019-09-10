import React from 'react';
import '../../styles/style.scss';
import '../Post/style.scss';
import noAvatar from '../../assets/noAvatar.svg';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { formatDescription } from '../../helpers/regex.description';
import { Spinner } from 'reactstrap';
import TextareaAutosize from 'react-textarea-autosize';

interface IBody {
    userId: string;
    postId: string;
}

interface IProps {
    newsFeed: any;
    author: any;
    image: any;
    description: string;
    getNewsFeedAsync: () => void;
    getMoreNewsFeedAsync: (page: number) => void;
    addLike: (body: IBody) => void;
    setCountOfLikes: (countOfLikes: number) => void;
    deleteLike: (body: IBody) => void;
    countOfLikes: number;
    likeExist: boolean;
    checkUserLikeExist: (doesExist: boolean) => void;
    addNextFeedPosts: (pageNumber: number) => void;
    loggedUsername: string;
}

export default class FeedPost extends React.Component<IProps> {

    public getMoreFeedPosts = (): void => {
        if (!this.props.newsFeed.loaded) {
            this.props.addNextFeedPosts(this.props.newsFeed.page + 1);
            this.props.getMoreNewsFeedAsync(this.props.newsFeed.page);
        }
    }

    public componentDidMount(): void {
        this.props.getNewsFeedAsync();
    }

    public render(): JSX.Element {
        const {author, image, description, countOfLikes}: any = this.props;
        return (
            <div className='profile-post border mb-5'>
                <div className='post-header p-2 border'>
                    <div className='d-flex flex-row'>
                        <img
                            src={author.photoPath || noAvatar}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle'
                        />
                        <Link
                            to={`/profile/${author.username}`}
                            className='text-dark mt-1 ml-3'>
                            {author.username}
                        </Link>
                    </div>
                </div>
                <img
                    src={image}
                    className='w-100 img-fluid'
                    alt='post'
                />
                <div className='d-block mt-3 mb-2 pl-3'>
                    <i className='fa fa-heart-o fa-2x fa-lg pr-1'/>
                    <span className='pl-2'>{countOfLikes}</span>
                </div>
                <div className='description-post pb-3 border-bottom'>
                    <div className='d-block pl-3 text-description'>
                        <img
                            src={author.photoPath || noAvatar}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle'
                        />
                        <Link
                            to={`/profile/${author.username}`}
                            className='d-inline-block text-dark ml-2'
                        >
                            {author.username}
                        </Link>
                        <p className='pl-2 mt-2 justify-self-start align-self-start'>
                            {formatDescription(description)}
                        </p>
                    </div>
                </div>
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
                <Waypoint
                    scrollableAncestor={window}
                    onEnter={(): void => {
                        this.getMoreFeedPosts();
                    }}
                />
                <div className='w-100 d-flex align-items-center justify-content-center'>
                    { this.props.newsFeed.loading && <Spinner className='mt-3' color='dark'/>}
                </div>
            </div>
        );
    }
}
