import React from 'react';
import Avatar from 'react-avatar-edit';
import noAvatar from '../assets/noAvatar.svg';
import { Button, Spinner } from 'reactstrap';
import { setAvatarToCropper, uploadPostAvatar } from '../../store/cropper/actions';
import { connect } from 'react-redux';
import { IState } from '../../store/cropper/reducers';

interface ICropperState {
    cropper: IState;
}

interface ILocalState {
    preview: null | string;
    src: null | string;
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

    public state: ILocalState = {
        preview: null,
        src: null,
    };

    public onClose = (): void => {
        this.setState({preview: null});
    }

    public urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
        const mime = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        return new File([buf], filename, {type: mime});

    }

    public onCrop = async (preview: any): Promise<void> => {
        this.setState({preview});
        const file = await this.urlToFile(preview, 'avatar', 'image/png');
        this.props.setAvatarToCropper(file);
    }

    public onBeforeFileLoad = (elem: any): void => {
        if (elem.target.files[0].size > this.FILE_SIZE) {
            alert('File is too big!');
            elem.target.value = '';
        }
    }

    public onClick = (): void => {
        this.props.uploadPostAvatar(this.props.avatar);
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
                    width={450}
                    height={300}
                    imageWidth={300}
                    imageHeight={300}
                    borderStyle={this.dropZoneStyle}
                    shadingColor='white'
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    src={this.state.src || ''}
                />
                {this.props.loading ? (
                    <Spinner className='mt-3' color='dark'/>
                ) : (
                    <Button
                        className='mt-3'
                        outline
                        color='danger'
                        size='lg'
                        onClick={this.onClick}
                    >
                        Save avatar
                    </Button>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: ICropperState): IState => ({
    avatar: state.cropper.avatar,
    loaded: state.cropper.loaded,
    error: state.cropper.error,
    loading: state.cropper.loading,
});

const mapDispatchToProps = {
    uploadPostAvatar,
    setAvatarToCropper,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cropper);
