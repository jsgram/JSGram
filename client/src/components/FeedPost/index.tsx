import React from 'react';
import '../../styles/style.scss';
import '../Post/style.scss';
import noAvatar from '../../assets/noAvatar.svg';
import {Link} from 'react-router-dom';
import { Waypoint } from 'react-waypoint';

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

export default class FeedPost extends React.Component<IProps> {

    public componentDidMount(): void {
        this.props.getNewsFeedAsync();
    }

   /* public getMorePosts = (): void => {
        if (!this.props.userPosts.loaded) {
            this.props.addNextPosts(this.props.userPosts.page + 1);
            this.props.getMoreNewsFeedAsync(this.props.userPosts.page);
        }
    }*/

    public render(): JSX.Element {
        return (
            <div className='profile-post border mb-5'>
                <div className='post-header p-2 border'>
                    <div className='d-flex flex-row'>
                        <img
                            src={this.props.user.photo || noAvatar}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle'
                        />
                        <Link
                            to={`/profile/${this.props.loggedUsername}`}
                            className='text-dark mt-1 ml-3'>
                            {this.props.loggedUsername}
                        </Link>
                    </div>
                </div>
                <img
                    src={this.props.user.photo}
                    className='w-100 img-fluid'
                    alt='post'
                />
                <div className='d-block mt-3 mb-2 pl-3'>
                    <i className='fa fa-heart fa-2x fa-lg pr-1 like'/>
                    <span className='pl-2'>5 likes</span>
                </div>
                <div className='description-post pb-3 border-bottom'>
                    <div className='d-block pl-3 text-description'>
                        <img
                            src={this.props.user.photo || noAvatar}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle'
                        />
                        <Link
                            to={`/profile/${this.props.loggedUsername}`}
                            className='d-inline-block text-dark ml-2'
                        >
                            {this.props.loggedUsername}
                        </Link>
                        <p className='pl-2 mt-2 justify-self-start align-self-start'>
                            {this.props.loggedUsername}
                        </p>
                    </div>
                </div>
                <div className='mt-3 px-2 d-flex'>
                                        <textarea
                                            className='add-comment p-0 border-0 col-9'
                                            placeholder='Write your comment...'
                                            autoComplete='off'
                                            rows={3}
                                        />
                    <button
                        className='button-comment p-0 border-0 mr-lg-2 mr-3 col-3'
                        type='submit'
                        disabled
                    >
                        Add
                    </button>
                </div>
                {/*<Waypoint
                    scrollableAncestor={window}
                    onEnter={(): void => {
                        this.getMorePosts();
                    }}
                />*/}
            </div>
        );
    }
}
