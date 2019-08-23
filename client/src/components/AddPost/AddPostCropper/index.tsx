import React from 'react';
import { Button } from 'reactstrap';
import Cropper from 'react-easy-crop';
import PostPhoto from '../PostPost';
import { history } from '../../../history';
import AddPostDropZone from '../AddPostDropZone';
import { getCroppedImg } from '../../../helpers/upload.photo';

interface IArea {
    width: number;
    height: number;
    x: number;
    y: number;
}

interface IState {
    imageSrc: string;
    crop: {x: number, y: number};
    zoom: number;
    aspect: number;
    croppedAreaPixels: null;
    croppedImage: string;
}

export default class AddPostCropper extends React.Component<any> {

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
    public selectImage = (imageFile: File): void => {
        const reader = new FileReader();
        // 1.1 Transform to base64
        reader.readAsDataURL(imageFile);
        reader.onloadend = (): void => {
            const imageSrc = reader.result;
            this.setState({imageSrc});
        };
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
    public showCroppedImage = async (): Promise<void> => {
        const cropped = await getCroppedImg(
            this.state.imageSrc,
            this.state.croppedAreaPixels,
        );
        const reader = new FileReader();
        reader.readAsDataURL(cropped);
        reader.onloadend = (): void => {
            const croppedImage = reader.result;
            this.setState({croppedImage});
        };
    }

    // 9 Upload img file to server
    public uploadPost = (): void => {
        this.props.uploadPost(this.state.croppedImage);
    }

    public render(): JSX.Element {
        return (
            <div className='text-center'>
                <Button className='btn' color='danger' onClick={this.previousPage}>Cancel</Button>
                <Button
                    className='btn' color='danger'
                    onClick={this.state.croppedImage ? this.uploadPost : this.showCroppedImage}
                >
                    {this.state.croppedImage ? 'Post' : 'Next'}
                </Button>
                {this.state.croppedImage ?
                    (
                        <PostPhoto
                            croppedImage={this.state.croppedImage}
                        />
                    ) : (
                        <div
                            className='row d-flex pt-10 justify-content-lg-center
                justify-content-sm-around justify-content-center'>
                            <div style={{height: '30em', width: '30em', marginTop: '3em', position: 'relative'}}>
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
                                                selectImage={this.selectImage}
                                            />
                                        )
                                }
                            </div>
                        </div>)
                }
            </div>
        );
    }
}
