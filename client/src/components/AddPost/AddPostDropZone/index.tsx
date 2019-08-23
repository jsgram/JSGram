import React from 'react';
import { DropzoneOptions, DropzoneState, useDropzone } from 'react-dropzone';

interface IProps {
    selectImage: (imageFile: File) => void;
}

const AddPostDropZone = (props: IProps): JSX.Element => {
    const {selectImage}: IProps = props;
    const { getRootProps, getInputProps}: DropzoneState = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: (files: any): void => selectImage(files[0]),
    });

    // TODO Move style to scss
    return (
        <section className='container flex'>
            <div {...getRootProps({className: 'dropzone'})}
                 style={{
                     margin: '0 auto',
                     height: '30em',
                     width: '30em',
                     marginTop: '3em',
                     position: 'relative',
                     backgroundColor: 'lightgray',
                 }}>
                <input {...getInputProps({})}/>
                <p>Drag 'n' drop photo here, or click to select photo</p>
            </div>
        </section>
    );
};

export default AddPostDropZone;
