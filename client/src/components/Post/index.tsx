import React from 'react';
import '../../styles/style.scss';
import { Waypoint } from 'react-waypoint';
import { IUserData } from '../Profile';
import { IPost } from '../../store/post/reducers';

interface IProps {
    posts: any;
    user: IUserData;
    getPostsAsync: (username: string) => void;
    getMorePostsAsync: (username: string, page: number) => void;
}

export default class Post extends React.Component<IProps> {

    public state: {page: number} = {
        page: 1,
    };

    public getMorePosts = (): void => {
        this.setState({page: this.state.page + 1});
        this.props.getMorePostsAsync(this.props.user.username, this.state.page);
    }

    public componentDidMount(): void {
        this.props.getPostsAsync(this.props.user.username);
    }

    public render(): JSX.Element {

        const postItems = this.props.posts.posts.map((post: IPost, i: number) => {
            const {description, imgPath}: any = post;
            return (
                <div className='col-md-4 text-center mt-2' key={i}>
                    <img src={imgPath} className='img-fluid' alt=''/>
                    <p>{description}</p>
                    <p>Likes: 0</p>
                </div>
            );
        });

        return (
            <div>

                <div className='row'>
                    {postItems}
                </div>
                <Waypoint
                    onEnter={(): void => {this.getMorePosts(); }}
                />
            </div>
        );
    }
}
