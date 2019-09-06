import React from 'react';
import * as profileAction from '../../store/profile/actions';
import * as cropperAction from '../../store/cropper/actions';
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

const CropperContainer = ({avatar, file, loaded, error, loading, user, uploadPostAvatar, setAvatarToCropper, createFile,
                              informFileIsTooBig, modalToggle}: ICropperProps): JSX.Element => {
    return (
        <Cropper
            avatar={avatar}
            file={file}
            loaded={loaded}
            error={error}
            loading={loading}
            user={user}
            uploadPostAvatar={uploadPostAvatar}
            setAvatarToCropper={setAvatarToCropper}
            createFile={createFile}
            informFileIsTooBig={informFileIsTooBig}
            modalToggle={modalToggle}
        />
    );
};

const mapStateToProps = (state: ICropperState): IState => ({
    avatar: state.cropper.avatar,
    file: state.cropper.file,
    loaded: state.cropper.loaded,
    error: state.cropper.error,
    loading: state.cropper.loading,
    user: state.profile.user,
});

const mapDispatchToProps = {
    uploadPostAvatar: profileAction.uploadPostAvatar,
    setAvatarToCropper: cropperAction.setAvatarToCropper,
    createFile: cropperAction.createFile,
    informFileIsTooBig: cropperAction.informFileIsTooBig,
};

export default connect(mapStateToProps, mapDispatchToProps)(CropperContainer);
