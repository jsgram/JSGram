import React from 'react';
import '../../styles/style.scss';

interface IProps {
    posts: any;
    getPostsAsync: () => void;
}

export default class Post extends React.Component<IProps> {

    public componentDidMount(): void {
        this.props.getPostsAsync();
    }

    // TODO Change to real props

    public render(): JSX.Element {
        // console.log(this.props.posts.posts[0]);

        // TODO Fix any

        const postItems = this.props.posts.posts.map((post: any, i: number) => {
            const {avatar, first_name, id}: any = post;
            return(
                <div className='col-md-4 text-center mt-2' key={i}>
                    <img src={avatar} alt=''/>
                    <p>{first_name}</p>
                    <p>Likes: {id}</p>
                </div>
            );
        })

        return (
            <div className='row'>
                {postItems}
            </div>
        );
    }
}
