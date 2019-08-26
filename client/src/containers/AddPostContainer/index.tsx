import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/addPost/action';
import AddPostCropper, { IProps } from '../../components/AddPost/AddPostCropper';
import {IState} from '../../store/addPost/reducers';

export interface ILocalState {
    addPost: IState;
}

class AddPostContainer extends React.Component<IProps> {
    public render(): JSX.Element {
        const { croppedImage, description, loading,
            uploadPost, setCroppedImageForPost, setDescriptionForPost, resetAddPost }: IProps = this.props;
        return(
            <AddPostCropper
                croppedImage={croppedImage}
                description={description}
                uploadPost={uploadPost}
                loading={loading}
                setCroppedImageForPost={setCroppedImageForPost}
                setDescriptionForPost={setDescriptionForPost}
                resetAddPost={resetAddPost}
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
    uploadPost: action.uploadPost,
    setCroppedImageForPost: action.setCroppedImageForPost,
    setDescriptionForPost: action.setDescriptionForPost,
    resetAddPost: action.resetAddPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostContainer);
