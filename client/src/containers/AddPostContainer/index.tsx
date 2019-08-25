import React from 'react';
import { connect } from 'react-redux';
import { uploadPost, setCroppedImageForPost, setDescriptionForPost, resetAddPost } from '../../store/addPost/action';
import AddPostCropper from '../../components/AddPost/AddPostCropper';
import {IState} from '../../store/addPost/reducers';

export interface ILocalState {
    addPost: IState;
}

class AddPostContainer extends React.Component<any> {
    public render(): JSX.Element {
        return(
            <AddPostCropper
                croppedImage={this.props.croppedImage}
                description={this.props.description}
                uploadPost={this.props.uploadPost}
                setCroppedImageForPost={this.props.setCroppedImageForPost}
                setDescriptionForPost={this.props.setDescriptionForPost}
                resetAddPost={this.props.resetAddPost}
            />
        );
    }
}

const mapStateToProps = (state: ILocalState): IState => ({
    croppedImage: state.addPost.croppedImage,
    description: state.addPost.description,
});

const mapDispatchToProps = {
    uploadPost,
    setCroppedImageForPost,
    setDescriptionForPost,
    resetAddPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostContainer);
