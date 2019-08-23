import React from 'react';
import { Button } from 'reactstrap';
import { AuthAPI } from '../../store/api';
import Cropper from 'react-easy-crop';
import PostPhoto from './PostPost';
import { history } from '../../history';
import AddPostDropZone from './AddPostDropZone';
import { base64ToFile, dataForAWS } from '../../helpers/upload.photo';

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

export default class AddPost extends React.Component {
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

    // 5 Create new image (not file)
    public createImage = (url: string): Promise<any> =>
        new Promise<any>((resolve: any, reject: any): any => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            // tslint:disable-next-line:typedef
            image.addEventListener('error', error => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        })

    // 6 Create cropped image in url
    public getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<any> => {
        const image = await this.createImage(imageSrc);
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        // @ts-ignore
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );

        // 7 Transform to blob url
        return new Promise((resolve: any, reject: any): any => {
            // tslint:disable-next-line:typedef
            canvas.toBlob(blob => {
                resolve((blob));
            }, 'image/jpeg');
        });
    }

    // 8 Transform cropped img in base64 to file
    public showCroppedImage = async (): Promise<void> => {
        const cropped = await this.getCroppedImg(
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
    // TODO move to redux later
    public uploadPost = async (): Promise<void> => {
        try {
            const newFile = await base64ToFile(this.state.croppedImage, 'avatar', 'image/png');
            const res = await AuthAPI.post('/profile/photo', dataForAWS(newFile));
            if (res.status === 200) {
                history.push('/profile');
            }
        } catch (e) {
            console.error(e);
        }
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
