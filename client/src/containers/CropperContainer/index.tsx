import React from 'react';
import { createFile, setAvatarToCropper, informFileIsTooBig } from '../../store/cropper/actions';
import { uploadPostAvatar } from '../../store/profile/actions';
import { connect } from 'react-redux';
import Cropper, { ICropperProps } from '../../components/Cropper';
import { IUserData } from '../../components/Profile';

interface IState {
    avatar: File | null;
    file: File | null;
    error: Error | null;
    loaded: boolean;
    loading: boolean;
    user: IUserData;
}

interface ICropperState {
    cropper: IState;
    profile: {
        user: IUserData;
    };
}

const CropperContainer = (props: ICropperProps): JSX.Element => (
    <Cropper
        avatar={props.avatar}
        file={props.file}
        loaded={props.loaded}
        error={props.error}
        loading={props.loading}
        user={props.user}
        uploadPostAvatar={props.uploadPostAvatar}
        setAvatarToCropper={props.setAvatarToCropper}
        createFile={props.createFile}
        informFileIsTooBig={props.informFileIsTooBig}
        modalToggle={props.modalToggle}
    />
);

const mapStateToProps = (state: ICropperState): IState => ({
    avatar: state.cropper.avatar,
    file: state.cropper.file,
    loaded: state.cropper.loaded,
    error: state.cropper.error,
    loading: state.cropper.loading,
    user: state.profile.user,
});

const mapDispatchToProps = {
    uploadPostAvatar,
    setAvatarToCropper,
    createFile,
    informFileIsTooBig,
};

export default connect(mapStateToProps, mapDispatchToProps)(CropperContainer);
