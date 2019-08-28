import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import {getPostsAsync} from '../../store/post/actions';

export class PostContainer extends React.Component <any> {
    public render(): JSX.Element {
        return (
            <div className='container'>
                <Post posts={this.props.posts} getPostsAsync={this.props.getPostsAsync}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any): any => ({
    posts: state.posts,
});

const mapDispatchToProps = {
    getPostsAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
