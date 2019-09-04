import React from 'react';
import Cropper from 'react-easy-crop';
import PostPhoto from '../PostPost';
import { Container, Row, Spinner } from 'reactstrap';
import AddPostDropZone from '../AddPostDropZone';
import { getCroppedImg, createBlobUrl } from '../../../helpers/upload.photo';
import '../PostPost/style.scss';

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
    maxZoom: number;
    aspect: number;
    croppedAreaPixels: null;
}

export interface IProps {
    croppedImage: string;
    description: string;
    loading: boolean;
    uploadPost: (croppedImage: string, description: string, username: string) => void;
    setCroppedImageForPost: any;
    setDescriptionForPost: any;
    resetAddPost: any;
    informFileError: (message: string) => void;
    getUserInfoFromToken: () => void;
    username: string;
}

export default class AddPostCropper extends React.Component<IProps> {

    public state: IState = {
        imageSrc: '',
        crop: {x: 0, y: 0},
        zoom: 1,
        maxZoom: 2,
        aspect: 3 / 3,
        croppedAreaPixels: null,
    };

    public componentDidMount(): void {
        this.props.getUserInfoFromToken();
    }

    // Helper
    public previousPage = (): void => {
        this.props.resetAddPost(this.props.username);
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
        createBlobUrl(cropped, (data: any) => {
            this.props.setCroppedImageForPost(data.target.result);
        });
    }

    // 9 Upload img file to server
    public onUploadPost = (): void => {
        this.props.uploadPost(
            this.props.croppedImage,
            this.props.description,
            this.props.username);
    }

    public render(): JSX.Element {
        const {imageSrc, crop, zoom, maxZoom, aspect}: IState = this.state;
        const {croppedImage, description, setDescriptionForPost, informFileError}: IProps = this.props;
        return (
            <div className='text-center'>
                {croppedImage ?
                    (
                        <PostPhoto
                            croppedImage={croppedImage}
                            description={description}
                            setDescriptionForPost={setDescriptionForPost}
                        />
                    ) : (
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
                                                />
                                                <p>Scroll to zoom</p>
                                            </div>
                                        ) : (
                                            <AddPostDropZone
                                                uploadImageToCropper={this.onUploadImageToCropper}
                                                informFileError={informFileError}
                                                resetImageSrc={this.resetImageSrc}
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
                        onClick={croppedImage ? this.onUploadPost : this.onShowCroppedImage}
                        disabled={!imageSrc}
                    >
                        {
                            this.props.loading ? <Spinner className='spinner-border spinner-border-sm'/>
                                : croppedImage ? 'Post' : 'Next'
                        }
                    </button>
                </Row>
            </div>
        );
    }
}
