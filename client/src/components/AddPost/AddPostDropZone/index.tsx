import React from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { Container, Row } from 'reactstrap';
import '../PostPost/AddPost.scss';

interface IProps {
    uploadImageToCropper: (imageFile: File) => void;
    informFileError: (message: string) => void;
    resetImageSrc: () => void;
}

const AddPostDropZone = (props: IProps): JSX.Element => {
    const {uploadImageToCropper, informFileError, resetImageSrc}: IProps = props;
    const {getRootProps, getInputProps}: DropzoneState = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: (files: any): void => {
            const maxFileSize = 1024 * 1024 * 4;
            if (files[0].size > maxFileSize) {
                resetImageSrc();
                return informFileError('Image is too big');
            }
            return uploadImageToCropper(files[0]);
        },
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
