import React from 'react';
import { Button } from 'reactstrap';
import Cropper from 'react-easy-crop';
import PostPhoto from '../PostPost';
import { history } from '../../../history';
import AddPostDropZone from '../AddPostDropZone';
import { getCroppedImg, createBlobUrl } from '../../../helpers/upload.photo';

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
}

export interface IProps {
    croppedImage: string;
    description: string;
    uploadPost: (croppedImage: string, description: string, resetState: () => void) => void;
    setCroppedImageForPost: any;
    setDescriptionForPost: any;
    resetAddPost: any;
}

export default class AddPostCropper extends React.Component<IProps> {

    public state: IState = {
        imageSrc: '',
        crop: {x: 0, y: 0},
        zoom: 1,
        aspect: 3 / 3,
        croppedAreaPixels: null,
    };

    // Helper
    public previousPage = (): void => {
        history.go(-1);
        this.props.resetAddPost();
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
            this.props.setCroppedImageForPost(data.target.result);
        });
    }

    // 9 Upload img file to server
    public onUploadPost = (): void => {
        this.props.uploadPost(this.props.croppedImage,
            this.props.description,
            this.props.resetAddPost);
    }

    public render(): JSX.Element {
        const {imageSrc, crop, zoom, aspect}: IState = this.state;
        const {croppedImage, description, setDescriptionForPost}: IProps = this.props;
        return (
            <div className='text-center'>
                <Button className='btn' color='danger' onClick={this.previousPage}>Cancel</Button>
                <Button
                    className='btn' color='danger'
                    onClick={croppedImage ? this.onUploadPost : this.onShowCroppedImage}
                    disabled={!imageSrc}
                >
                    {croppedImage ? 'Post' : 'Next'}
                </Button>
                {croppedImage ?
                    (
                        <PostPhoto
                            croppedImage={croppedImage}
                            description={description}
                            setDescriptionForPost={setDescriptionForPost}
                        />
                    ) : (
                        <div
                            className='row d-flex pt-10 justify-content-lg-center
                justify-content-sm-around justify-content-center'>
                            <div style={{height: '30em', width: '30em', marginTop: '3em', position: 'relative'}}>
                                {
                                    imageSrc ?
                                        (
                                            < Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={aspect}
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
                        </div>)
                }
            </div>
        );
    }
}
