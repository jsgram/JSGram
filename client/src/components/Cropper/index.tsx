import React from 'react';
import Cropper from 'react-easy-crop';
import {Container, Row, Spinner} from 'reactstrap';
import AddPostDropZone from '../AddPost/AddPostDropZone';
import '../AddPost/PostPost/style.scss';
import { createBlobUrl, getCroppedImg } from '../../helpers/upload.photo';

export interface IAddAvatarCropperProps {
    croppedImage: string;
    uploadPostAvatar: (croppedImage: string) => void;
    setCroppedImageForAvatar: (croppedImage: string) => void;
    loading: boolean;
    informFileError: any;
    resetAddPost: any;
}

interface IState {
    imageSrc: string;
    crop: { x: number, y: number };
    zoom: number;
    maxZoom: number;
    aspect: number;
    croppedAreaPixels: null;
}

interface IArea {
    width: number;
    height: number;
    x: number;
    y: number;
}

export interface ILocation {
    x: number;
    y: number;
}

export default class AddPostCropper extends React.Component<IAddAvatarCropperProps> {

    public state: IState = {
        imageSrc: '',
        crop: {x: 0, y: 0},
        zoom: 1,
        maxZoom: 2,
        aspect: 3 / 3,
        croppedAreaPixels: null,
    };

    // 1 Select image
    public onUploadImageToCropper = (imageFile: File): void => {
        createBlobUrl(imageFile, (data: any) => {
            this.setState({imageSrc: data.target.result});
        });
    }

    // 2 Set crop position to Cropper
    public onCropChange = (crop: ILocation): void => {
        this.setState({crop});
    }

    // 3 Set zoom to Cropper
    public onZoomChange = (zoom: number): void => {
        this.setState({zoom});
    }

    public resetImageSrc = (): void => {
        this.setState({imageSrc: ''});
    }

    // 4 Save crop area
    public onCropComplete = (croppedArea: IArea, croppedAreaPixels: IArea): void => {
        this.setState({croppedAreaPixels});
    }

    // 5 Create new image (not file) inside getCroppedImg
    // 6 Create cropped image in url inside getCroppedImg
    // 7 Transform to blob url inside getCroppedImg
    // 8 Transform cropped img in base64 to file
    public onShowCroppedImage = async (): Promise<void> => {
        const cropped = await getCroppedImg(
            this.state.imageSrc,
            this.state.croppedAreaPixels,
        );
        await createBlobUrl(cropped, (data: any) => {
            this.props.setCroppedImageForAvatar(data.target.result);
            this.props.uploadPostAvatar(this.props.croppedImage);
        });
    }

    public render(): JSX.Element {
        const {imageSrc, crop, zoom, maxZoom, aspect}: IState = this.state;
        return (
            <div className='text-center'>

                <Container>
                    <Row>
                        <div className=' mx-auto mt-3 post-label'>New post</div>
                    </Row>
                    <div className='cropper-photo mt-3 mx-auto'>
                        {
                            imageSrc ?
                                (
                                    <div>
                                        < Cropper
                                            image={imageSrc}
                                            crop={crop}
                                            zoom={zoom}
                                            maxZoom={maxZoom}
                                            aspect={aspect}
                                            onCropChange={this.onCropChange}
                                            onCropComplete={this.onCropComplete}
                                            onZoomChange={this.onZoomChange}
                                            cropShape='round'
                                        />
                                    </div>
                                ) : (
                                    <AddPostDropZone
                                        uploadImageToCropper={this.onUploadImageToCropper}
                                        informFileError={this.props.informFileError}
                                        resetImageSrc={this.props.resetAddPost}
                                        sizeMB={2}
                                    />
                                )
                        }
                    </div>
                </Container>

                <Row className='justify-content-center post mx-auto'>
                    <button
                        className='mt-3 ml-0 button'
                        onClick={this.onShowCroppedImage}
                        disabled={!imageSrc}
                    >
                        {this.props.loading ? <Spinner color='white'/> : 'Save'}
                    </button>
                </Row>
            </div>
        );
    }
}
