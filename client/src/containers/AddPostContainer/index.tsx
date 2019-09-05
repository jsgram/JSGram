import React from 'react';
import { connect } from 'react-redux';
import * as addPostAction from '../../store/addPost/action';
import AddPostCropper, { IProps } from '../../components/AddPost/AddPostCropper';

export interface IState {
    croppedImage: string;
    description: string;
    loading: boolean;
}

export interface ILocalState {
    addPost: IState;
}

class AddPostContainer extends React.Component<IProps> {
    public render(): JSX.Element {
        const { croppedImage, description, loading, uploadPost, setCroppedImageForPost, setDescriptionForPost,
            resetAddPost, informFileError, loggedUsername }:
            IProps = this.props;
        return(
            <AddPostCropper
                croppedImage={croppedImage}
                description={description}
                uploadPost={uploadPost}
                loading={loading}
                setCroppedImageForPost={setCroppedImageForPost}
                setDescriptionForPost={setDescriptionForPost}
                resetAddPost={resetAddPost}
                informFileError={informFileError}
                loggedUsername={loggedUsername}
            />
        );
    }
}

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
