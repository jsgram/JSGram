import React from 'react';
import Cropper from 'react-easy-crop';
import PostPhoto from '../PostPost';
import { history } from '../../../history';
import { Container, Row, Input} from 'reactstrap';
import AddPostDropZone from '../AddPostDropZone';
import { getCroppedImg, createBlobUrl } from '../../../helpers/upload.photo';
import '../PostPost/AddPost.scss';
import { secretAccessKey } from './../../../../../server/src/common.constants/aws.multer.profile.constants';

interface IArea {
    width: number;
    height: number;
    x: number;
    y: number;
}

interface IState {
    imageSrc: string;
    crop: { x: number, y: number };
    zoom: number;
    aspect: number;
    croppedAreaPixels: null;
    croppedImage: string;
}

export interface IProps {
    croppedImage: string;
    uploadPost: (croppedImage: string) => void;
}

export default class AddPostCropper extends React.Component<IProps> {

    public state: IState = {
        imageSrc: '',
        crop: {x: 0, y: 0},
        zoom: 1,
        aspect: 3 / 3,
        croppedAreaPixels: null,
        croppedImage: '',
    };

    // Helper
    public previousPage = (): void => {
        history.go(-1);
    }

    // 1 Select image
    public onUploadImageToCropper = (imageFile: File): void => {
        createBlobUrl(imageFile, (data: any) => {
            this.setState({imageSrc: data.target.result});
        });
    }

    // 2 Set crop position to Cropper
    public onCropChange = (crop: any): void => {
        this.setState({crop});
    }

    // 3 Set zoom to Cropper
    public onZoomChange = (zoom: number): void => {
        this.setState({zoom});
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
        createBlobUrl(cropped, (data: any) => {
            this.setState({croppedImage: data.target.result});
        });
    }

    // 9 Upload img file to server
    public onUploadPost = (): void => {
        this.props.uploadPost(this.state.croppedImage);
    }

    public render(): JSX.Element {
        return (
                <div className='text-center'>
                    {this.state.croppedImage ?
                        (
                            <PostPhoto
                                croppedImage={this.state.croppedImage}
                            />
                        ) : (
                            <Container>
                                <Row>
                                    <text className=' mx-auto mt-3 post-label'>New post</text>
                                </Row>
                                <div className='cropper-photo mt-3 mx-auto'>
                                    {
                                        this.state.imageSrc ?
                                            (
                                                < Cropper
                                                    image={this.state.imageSrc}
                                                    crop={this.state.crop}
                                                    zoom={this.state.zoom}
                                                    aspect={this.state.aspect}
                                                    onCropChange={this.onCropChange}
                                                    onCropComplete={this.onCropComplete}
                                                    onZoomChange={this.onZoomChange}
                                                />
                                            ) : (
                                                <AddPostDropZone
                                                    uploadImageToCropper={this.onUploadImageToCropper}
                                                />
                                            )
                                    }
                                </div>
                            </Container>)
                    }
                    <Row className='justify-content-between post mx-auto'>
                        <button className='mt-3 ml-0 button' onClick={this.previousPage}>Cancel</button>
                        <button
                            className='mt-3 ml-0 button'
                            onClick={this.state.croppedImage ? this.onUploadPost : this.onShowCroppedImage}
                            disabled={!this.state.imageSrc}
                        >
                            {this.state.croppedImage ? 'Post' : 'Next'}
                        </button>
                    </Row>
                </div>
        );
    }
}
