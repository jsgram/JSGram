import React from 'react';
import { connect } from 'react-redux';
import * as addPostAction from '../../store/addPost/action';
import * as feedAction from '../../store/feed/actions';
import AddPostCropper, { IProps } from '../../components/AddPost/AddPostCropper';

export interface IState {
    croppedImage: string;
    description: string;
    loading: boolean;
    username: string;
}

export interface ILocalState {
    addPost: IState;
    feed: IState;
}

class AddPostContainer extends React.Component<IProps> {
    public render(): JSX.Element {
        const { croppedImage, description, loading, uploadPost, setCroppedImageForPost, setDescriptionForPost,
            resetAddPost, informFileError, getUserInfoFromToken, username }:
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
                getUserInfoFromToken={getUserInfoFromToken}
                username={username}
            />
        );
    }
}

const mapStateToProps = (state: ILocalState): IState => ({
    croppedImage: state.addPost.croppedImage,
    description: state.addPost.description,
    loading: state.addPost.loading,
    username: state.feed.username,
});

const mapDispatchToProps = {
    uploadPost: addPostAction.uploadPost,
    setCroppedImageForPost: addPostAction.setCroppedImageForPost,
    setDescriptionForPost: addPostAction.setDescriptionForPost,
    resetAddPost: addPostAction.resetAddPost,
    informFileError: addPostAction.informFileError,
    getUserInfoFromToken: feedAction.getUserInfoFromToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostContainer);
