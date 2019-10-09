import React from 'react';
import { connect } from 'react-redux';
import * as addPostAction from '../../store/addPost/action';
import AddPostCropper, { IAddPostCropperProps } from '../../components/AddPost/AddPostCropper';

export interface IState {
    croppedImage: string;
    description: string;
    loading: boolean;
}

export interface ILocalState {
    addPost: IState;
}

export const AddPostContainer = ({
                              croppedImage, description, loading, uploadPost, setCroppedImageForPost,
                              setDescriptionForPost, resetAddPost, informFileError, loggedUsername,
                          }: IAddPostCropperProps): JSX.Element => (
    <AddPostCropper
        loggedUsername={loggedUsername}
        croppedImage={croppedImage}
        description={description}
        loading={loading}
        uploadPost={uploadPost}
        setCroppedImageForPost={setCroppedImageForPost}
        setDescriptionForPost={setDescriptionForPost}
        resetAddPost={resetAddPost}
        informFileError={informFileError}
    />
);

const mapStateToProps = (state: ILocalState): IState => ({
    croppedImage: state.addPost.croppedImage,
    description: state.addPost.description,
    loading: state.addPost.loading,
});

const mapDispatchToProps = {
    uploadPost: addPostAction.uploadPost,
    setCroppedImageForPost: addPostAction.setCroppedImageForPost,
    setDescriptionForPost: addPostAction.setDescriptionForPost,
    resetAddPost: addPostAction.resetAddPost,
    informFileError: addPostAction.informFileError,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostContainer);
