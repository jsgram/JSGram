import React from 'react';
import { Container, Row, Input} from 'reactstrap';
import '../PostPost/AddPost.scss';
import post_img from '../../../assets/post.png';

export default class PostPhoto extends React.Component<any> {
    public render(): JSX.Element {
        return (
            <Container>
                <Row>
                    <text className=' mx-auto mt-3 post-label'>New post</text>
                </Row>
                <Row  className= 'mt-2 mx-auto post'>
                    <img src= {post_img} className='img-fluid rounded' alt='Here is a post photo.'/>
                    <Input className='mt-3' type='textarea' name='text' placeholder='Write a caption'/>
                </Row>
                {/* <Row className='justify-content-between post mx-auto'>
                    <button className='mt-3 ml-0 button'>Post</button>
                    <button className='mt-3 mr-0 button'>Cancel</button>
                </Row> */}
            </Container>
        );
    }
}
