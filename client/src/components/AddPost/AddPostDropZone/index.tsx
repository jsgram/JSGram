import React from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { Container, Row } from 'reactstrap';
import '../PostPost/AddPost.scss';

interface IProps {
    uploadImageToCropper: (imageFile: File) => void;
}

const AddPostDropZone = (props: IProps): JSX.Element => {
    const {uploadImageToCropper}: IProps = props;
    const {getRootProps, getInputProps}: DropzoneState = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: (files: any): void => uploadImageToCropper(files[0]),
    });

    return (
        <Container className='drop-zone'>
            <Row>
                <div {...getRootProps({className: 'dropzone border-style cropper-photo'})}>
                    <input {...getInputProps({})}/>
                    <p className='upload-text'>Drag your photo here or click to select it.</p>
                </div>
            </Row>
        </Container>
    );
};

export default AddPostDropZone;
