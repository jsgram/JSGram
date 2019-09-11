import React from 'react';
import { informFileError, setCroppedImageForAvatar, resetAddPost } from '../../store/cropper/actions';
import { uploadPostAvatar } from '../../store/profile/actions';
import { connect } from 'react-redux';
import CropperAvatar, {IAddAvatarCropperProps} from '../../components/Cropper';

export interface IState {
    croppedImage: string;
    loading: boolean;
}

const CropperContainer = (props: IAddAvatarCropperProps): JSX.Element => (
    <CropperAvatar
        loading={props.loading}
        croppedImage={props.croppedImage}
        uploadPostAvatar={props.uploadPostAvatar}
        setCroppedImageForAvatar={props.setCroppedImageForAvatar}
        informFileError={props.informFileError}
        resetAddPost={props.resetAddPost}
    />
);
const mapStateToProps = (state: any): IState => ({
    croppedImage: state.cropper.croppedImage,
    loading: state.profile.loading,
});

const mapDispatchToProps = {
    uploadPostAvatar,
    setCroppedImageForAvatar,
    informFileError,
    resetAddPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CropperContainer);
