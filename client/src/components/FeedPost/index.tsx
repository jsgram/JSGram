import React from 'react';
import '../../styles/style.scss';
import '../Post/style.scss';
import noAvatar from '../../assets/noAvatar.png';
import {Link} from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { formatDescription } from '../../helpers/regex.description';
import { IUserData } from '../Profile';
import { Comment } from '../Comments';
// import Likes from '../Likes';

interface IBody {
    userId: string;
    postId: string;
}

interface IProps {
    id: any;
    newsFeed: any;
    author: any;
    image: any;
    description: string;
    user: IUserData;
    getNewsFeedAsync: () => void;
    getMoreNewsFeedAsync: (page: number) => void;
    // authorsOfLike: any;
    // addLoggedUserLike: (loggedUserId: string, postId: string, authorsOfLike: []) => void;
    // removeLoggedUserLike: (loggedUserId: string, postId: string, authorsOfLike: []) => void;
    // addLike: (body: IBody) => void;
    // setCountOfLikes: (countOfLikes: number) => void;
    // deleteLike: (body: IBody) => void;
    // likeExist: boolean;
    // checkUserLikeExist: (doesExist: boolean) => void;
    addNextFeedPosts: (pageNumber: number) => void;
    loggedId: string;
    loggedUsername: string;
}

export default class FeedPost extends React.Component<IProps> {

    public componentDidUpdate(prevProps: any): void {
        const {newsFeed: {authorsOfLike}}: any = this.props;
        const {newsFeed:  {authorsOfLike: prevAuthorsOfLike}}: any = prevProps;
        // if (authorsOfLike !== prevAuthorsOfLike) {
        //     this.props.setCountOfLikes(authorsOfLike.length);
        //
        //     const checkLoggedUserLikeExist = authorsOfLike.filter((userId: string) =>
        //         this.props.user._id === userId,
        //     );
        //
        //     this.props.checkUserLikeExist(!!checkLoggedUserLikeExist.length);
        // }
    }

    // public onAddLike = (): void => {
    //     const {
    //         user: {_id: userId},
    //         id: postId,
    //     }: any = this.props;
    //     const body = {userId, postId};
    //     this.props.addLoggedUserLike(
    //         this.props.loggedId,
    //         postId,
    //         this.props.authorsOfLike,
    //     );
    //     this.props.addLike(body);
    // }
    //
    // public onDeleteLike = (): void => {
    //     const {
    //         user: {_id: userId},
    //         id: postId,
    //     }: any = this.props;
    //     const body = {userId, postId};
    //     this.props.removeLoggedUserLike(
    //         this.props.loggedId,
    //         postId,
    //         this.props.authorsOfLike,
    //     );
    //     this.props.deleteLike(body);
    // }

    public render(): JSX.Element {
        console.log(this.props);
        const {author, image, description, likeExist, authorsOfLike}: any = this.props;

        // const likeButton = likeExist ?
        //     (<i className='fa fa-heart fa-lg pr-1 like' onClick={this.onDeleteLike}/>) :
        //     (<i className='fa fa-heart-o fa-lg pr-1' onClick={this.onAddLike}/>);

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
                    {/*<span className='pl-2'>{likeButton} {authorsOfLike.length} likes</span>*/}
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
                <Comment/>
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
    }
}
