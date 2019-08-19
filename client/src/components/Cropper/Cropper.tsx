import React from 'react';
import Avatar from 'react-avatar-edit';
import noAvatar from '../assets/noAvatar.svg';
import {Button} from 'reactstrap';
interface IFormProps {
    deletePhoto: () => void;
}
class Cropper extends React.Component<IFormProps> {

    public FILE_SIZE: number = 2000000;

    public dropZoneStyle: any = {
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
    };

    public state: { preview: null | string, src: null | string } = {
        preview: null,
        src: null,
    };

    public onClose = (): void => {
        this.setState({preview: null});
    }

    public onCrop = (preview: any): void => {
        this.setState({preview});
    }

    public onBeforeFileLoad = (elem: any): void => {
        if (elem.target.files[0].size > this.FILE_SIZE) {
            alert('File is too big!');
            elem.target.value = '';
        }
    }
    public onPhotoDelete = (): void => {
        this.props.deletePhoto();
    }

    public render(): JSX.Element {
        return (
            <div className='text-center' style={{maxWidth: 560, margin: '0 auto'}}>

                <div className='text-center'>
                    <img
                        height={100}
                        width={100}
                        className='mb-3'
                        src={this.state.preview || noAvatar}
                        alt='Preview'
                    />
                </div>

                    <Avatar
                        width={560}
                        height={500}
                        imageWidth={250}
                        imageHeight={250}
                        borderStyle={this.dropZoneStyle}
                        shadingColor='white'
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        onBeforeFileLoad={this.onBeforeFileLoad}
                        src={this.state.src || ''}
                    />
                <Button className='mt-3' outline color='danger' size='lg'>Save avatar</Button>
                <Button onClick = { this.onPhotoDelete } className='bg-dark ml-2 btn'>Delete photo</Button>
            </div>

        );
    }
}

export default Cropper;
