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
                <div className=' mx-auto mt-3 post-label'>New post</div>
            </Row>
            <Row  className= 'mt-2 mx-auto post'>
                <img src={croppedImage} className='img-fluid rounded' alt='cropped img'/>
                <Input
                    className='mt-3'
                    type='textarea'
                    name='description'
                    placeholder='Write a caption...'
                    spellCheck={false}
                    value={description}
                    onChange={this.onDescriptionChange}
                />
            </Row>
        </Container>
        );
    }
}
