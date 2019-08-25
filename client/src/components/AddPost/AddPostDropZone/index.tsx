import React from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { Container, Row, Input} from 'reactstrap';
import '../PostPost/AddPost.scss';
import plus from '../../../assets/plus.jpg'

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
                <Row {...getRootProps({className: 'cropper-photo'})}>
                    <input {...getInputProps({})}/>
                    <img src={plus} className='img-fluid rounded' alt='Here is a post photo.'/>
                    {/* <p>Drag a photo here or click to select photo</p> */}
                </Row>
            </Container>
    );
};

export default AddPostDropZone;
