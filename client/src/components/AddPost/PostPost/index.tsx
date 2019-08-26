import React from 'react';
import { Container, Row, Input} from 'reactstrap';
import '../PostPost/AddPost.scss';

export default class PostPhoto extends React.Component<any> {
    public onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.setDescriptionForPost(event.target.value);
    }
    public render(): JSX.Element {
        const {croppedImage, description}: any = this.props;
        return (
        <Container>
            <Row>
                <text className=' mx-auto mt-3 post-label'>New post</text>
            </Row>
            <Row  className= 'mt-2 mx-auto post'>
                <img src={this.props.croppedImage} className='img-fluid rounded' alt='Here is a post photo.'/>
                <Input className='mt-3' type='textarea' name='text' placeholder='Write a caption'/>
            </Row>
        </Container>
        );
    }
}
