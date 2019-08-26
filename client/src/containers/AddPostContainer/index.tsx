import React from 'react';
import { connect } from 'react-redux';
import { uploadPost, setCroppedImageForPost, setDescriptionForPost, resetAddPost } from '../../store/addPost/action';
import AddPostCropper, { IProps } from '../../components/AddPost/AddPostCropper';
import {IState} from '../../store/addPost/reducers';

export interface ILocalState {
    addPost: IState;
}

class AddPostContainer extends React.Component<IProps> {
    public render(): JSX.Element {
        const { croppedImage, description,
            uploadPost, setCroppedImageForPost, setDescriptionForPost, resetAddPost }: IProps = this.props;
        return(
            <AddPostCropper
                croppedImage={croppedImage}
                description={description}
                uploadPost={uploadPost}
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
});

const mapDispatchToProps = {
    uploadPost,
    setCroppedImageForPost,
    setDescriptionForPost,
    resetAddPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostContainer);
