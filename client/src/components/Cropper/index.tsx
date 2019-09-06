import React from 'react';
import Avatar from 'react-avatar-edit';
import noAvatar from '../../assets/noAvatar.svg';
import { Button, Spinner } from 'reactstrap';
import { IUserData } from '../Profile';

export interface ICropperProps {
    avatar: any;
    file: any;
    loaded: boolean;
    error: Error | null;
    loading: boolean;
    user: IUserData;
    uploadPostAvatar: (avatar: File) => void;
    setAvatarToCropper: (avatar: File) => void;
    createFile: (preview: string) => void;
    informFileIsTooBig: () => void;
    modalToggle: () => void;
}

interface ILocalState {
    preview: null | string;
    src: null | string;
}

interface IDropZoneStyle {
    width: any;
    margin: string;
    display: string;
    flexDirection: string;
    alignItems: string;
    padding: number;
    borderWidth: number;
    borderRadius: number;
    borderColor: string;
    borderStyle: any;
    backgroundColor: string;
    color: string;
    outline: string;
    transition: string;
}

export default class Cropper extends React.Component<ICropperProps> {

    public dropZoneStyle: IDropZoneStyle = {
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
        preview: this.props.user.photo,
        src: null,
    };

    public onClose = (): void => {
        this.setState({preview: this.props.user.photo});
    }

    public onCrop = async (preview: any): Promise<void> => {
        this.setState({preview});
        this.props.createFile(preview);
    }
    public onBeforeFileLoad = (elem: any): void => {
        const FILE_SIZE = 2000000;
        if (elem.target.files[0].size > FILE_SIZE) {
            this.props.informFileIsTooBig();
            elem.target.value = '';
        }
    }

    public onClick = (): void => {
        this.props.uploadPostAvatar(this.props.avatar);
        this.props.modalToggle();
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
                    width={this.dropZoneStyle.width}
                    height={300}
                    imageWidth={300}
                    borderStyle={this.dropZoneStyle.borderStyle}
                    shadingColor='white'
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    src={this.state.src || ''}
                />
                {this.state.preview && this.state.preview !== this.props.user.photo && (
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
