import React from 'react';
import { useDropzone } from 'react-dropzone';

const AddPostDropZone = (props: any): JSX.Element => {
    const {selectImage}: any = props;
    const { getRootProps, getInputProps}: any = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: (files: any): void => selectImage(files[0]),
    });

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
