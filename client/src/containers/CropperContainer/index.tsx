import React from 'react';
import { createFile, setAvatarToCropper, informFileIsTooBig } from '../../store/cropper/actions';
import { uploadPostAvatar } from '../../store/profile/actions';
import { connect } from 'react-redux';
import Cropper from '../../components/Cropper';
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

class CropperContainer extends React.Component<any> {
    public render(): JSX.Element {
        return(
            <Cropper
                avatar={this.props.avatar}
                file={this.props.file}
                loaded={this.props.loaded}
                error={this.props.error}
                loading={this.props.loading}
                user={this.props.user}
                uploadPostAvatar={this.props.uploadPostAvatar}
                setAvatarToCropper={this.props.setAvatarToCropper}
                createFile={this.props.createFile}
                informFileIsTooBig={this.props.informFileIsTooBig}
                modalToggle={this.props.modalToggle}
            />
        );
    }
}

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
