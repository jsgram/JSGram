import React from 'react';
import { Container, Row, Input } from 'reactstrap';
import './style.scss';

export interface IPostPostProps {
    croppedImage: string;
    description: string;
    setDescriptionForPost: (description: string) => void;
}

export const PostPhoto = ({croppedImage, description, setDescriptionForPost}: IPostPostProps): JSX.Element => {
    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescriptionForPost(event.target.value);
    };

    return (
        <Container>
            <Row>
                <div className=' mx-auto mt-3 post-label'>New post</div>
            </Row>
            <Row className='mt-2 mx-auto post'>
                <img
                    src={croppedImage}
                    height={293}
                    className='img-fluid rounded w-100'
                    alt='cropped img'
                />
                <Input
                    className='mt-3'
                    type='textarea'
                    name='description'
                    placeholder='Write a caption...'
                    spellCheck={false}
                    value={description}
                    onChange={onDescriptionChange}
                    maxLength={200}
                />
            </Row>
        </Container>
    );
};
