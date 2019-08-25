import React from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { Container, Row, Input} from 'reactstrap';
import '../PostPost/AddPost.scss';


interface IProps {
    uploadImageToCropper: (imageFile: File) => void;
}

const AddPostDropZone = (props: IProps): JSX.Element => {
    const {uploadImageToCropper}: IProps = props;
    const { getRootProps, getInputProps}: DropzoneState = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: (files: any): void => uploadImageToCropper(files[0]),
    });

    return (
            <Container>
                <Row>
                    <text className=' mx-auto mt-3 post-label'>New post</text>
                </Row>
                <Row  className= 'mt-2 mx-auto post'>
                <div {...getRootProps({className: 'dropzone'})} className='post gray-zone'>
                <input {...getInputProps({})}/>
                <p>Drag 'n' drop photo here, or click to select photo</p>
            </div>
                    <Input className='mt-3' type='textarea' name='text' placeholder='Write a caption'/>
                </Row>
                <Row className='justify-content-between post mx-auto'>
                    <button className='mt-3 ml-0 button'>Post</button>
                    <button className='mt-3 mr-0 button'>Cancel</button>
                </Row>
            </Container>

    );
};

export default AddPostDropZone;
