import React from 'react';
import { IState } from '../../store/cropper/reducers';
import { createFile, setAvatarToCropper, uploadPostAvatar, checkFileSize } from '../../store/cropper/actions';
import { connect } from 'react-redux';
import Cropper from '../../components/Cropper';

interface ICropperState {
    cropper: IState;
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
                uploadPostAvatar={this.props.uploadPostAvatar}
                setAvatarToCropper={this.props.setAvatarToCropper}
                createFile={this.props.createFile}
                checkFileSize={this.props.checkFileSize}
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
});

const mapDispatchToProps = {
    uploadPostAvatar,
    setAvatarToCropper,
    createFile,
    checkFileSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(CropperContainer);
