import React from 'react';
import Avatar from 'react-avatar-edit';
import noAvatar from '../assets/noAvatar.svg';
import { Button } from 'reactstrap';
import { setAvatarToCropper, uploadAvatar } from '../../store/cropper/actions';
import { connect } from 'react-redux';
import fs from 'fs';

interface IStateToProps {
    avatar: File;
    loaded: boolean;
    error: Error;
}

interface IState {
    cropper: IStateToProps;
}

class Cropper extends React.Component<any> {

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

    public state: { preview: null | string, src: null | string, selectedFile: any } = {
        preview: null,
        src: null,
        selectedFile: null,
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

    public onFileLoad = (data: any): any => {
        this.props.setAvatarToCropper(data);
    }

    public onClick = (): void => {
        this.props.uploadAvatar(this.props.avatar);
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
                    onFileLoad={this.onFileLoad}
                    src={this.state.src || ''}
                />
                <Button className='mt-3' outline color='danger' size='lg' onClick={this.onClick}>Save avatar</Button>
            </div>

        );
    }
}

const mapStateToProps = (state: IState): { avatar: File, loaded: boolean, error: Error } => ({
    avatar: state.cropper.avatar,
    loaded: state.cropper.loaded,
    error: state.cropper.error,
});

const mapDispatchToProps = {
    uploadAvatar,
    setAvatarToCropper,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cropper);
